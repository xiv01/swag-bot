const { Anthropic } = require('@anthropic-ai/sdk');
const { personalityPrompt, claudeKEY } = require('../../cfg.json');
const { log } = require("../../util/util");

const anthropic = new Anthropic({
    apiKey: claudeKEY,
});

async function aiReply(bot, message) {
    if (message.author.bot) return;
    if (!message.mentions.has(bot.user)) return;
    await message.channel.sendTyping();

    await log(bot, {
        title: "AI Reply",
        message: `**message**: ${message.content}\n**author**: <@${message.author.id}>`,
    });

    const messages = await message.channel.messages.fetch({ limit: 5 });
    const context = Array.from(messages.values())
        .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
        .map(msg => `${msg.author.username}: ${msg.content}`)
        .join('\n');

    const userPrompt = `${personalityPrompt}\nContext:\n${context}\n\n${message.author.username}: ${message.content}`;

    const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        messages: [
            { role: "user", content: userPrompt }
        ]
    });

    let reply = response.content?.[0]?.text || 'sorry, I could not generate a response';

    if (reply.includes('@everyone')) {
        reply = reply.replace(/@everyone/g, '[everyone]');
    }

    await message.reply(reply);
}

module.exports = { aiReply };