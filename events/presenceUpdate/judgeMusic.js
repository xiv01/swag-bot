module.exports = { judgeMusic };

async function judgeMusic(presence) {
    if(typeof presence.activities[0] !== 'undefined') {
        //let channel = presence.guild.channels.cache.find(channel => channel.type === 0);
        for(const i of presence.activities) {
            if(i.name === 'Spotify') {
                let artist = i.state;
                let song = i.details;
                console.log(`@` + i.userId + ` is listening to ` + artist + ` - ` + song);
                //await channel.send(`<@${presence.userId}> is listening to ` + artist + ` - ` + song);
            } 
        }
    }
}