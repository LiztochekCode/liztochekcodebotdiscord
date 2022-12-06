const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'play',
    description: "играть музыку!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'песня которую ты хочешь послушать',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	await inter.deferReply();
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Результаты не найдены ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });

        const queue = await player.createQueue(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);
            return inter.editReply({ content: `Я не могу зайти к тебе ${inter.member}... try again ? ❌`, ephemeral: true});
        }

       await inter.editReply({ content:`Загрузка твоего ${res.playlist ? 'playlist' : 'track'}... 🎧`});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
