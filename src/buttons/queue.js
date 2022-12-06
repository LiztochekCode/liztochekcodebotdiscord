const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не играет... попробуешь еще раз ? ❌`, ephemeral: true });

    if (!queue.tracks[0]) return  inter.reply({ content: `Нет музыки в очереди после текущей ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `And **${songs - 5}** остальные песня(и)...` : `В плейлисте **${songs}** песня(и)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Серверная очередь - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Сейчас ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Сделано листиком - LiztochekCode 💗', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.reply({ embeds: [embed], ephemeral: true });
}
