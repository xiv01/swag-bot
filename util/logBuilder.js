const { EmbedBuilder } = require('discord.js');
const { bot } = require('../app.js');

class LogBuilder {
    static #bot = bot;
    #channel;
    #title;
    #message;
    #member;
    #color = "333333";

    withTitle(title) {
        this.#title = title;
        return this;
    }

    withMessage(message) {
        this.#message = message;
        return this;
    }

    withColor(color) {
        this.#color = color;
        return this;
    }

    withMember(member) {
        this.#member = member;
        return this;
    }

    build() {
        return {
            channel: this.#channel,
            title: this.#title,
            message: this.#message,
            color: this.#color,
            member: this.#member
        };
    }
}