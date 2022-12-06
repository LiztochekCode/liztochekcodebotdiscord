const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не играет... попробуешь еще раз ? ❌`, ephemeral: true });

    const track = queue.current;

    const methods = ['disabled', 'track', 'queue'];

    const timestamp = queue.getPlayerTimestamp();

    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`Громкость **${queue.volume}**%\nПродолжительность **${trackDuration}**\nПрогресс ${progress}\nЦикл мод **${methods[queue.repeatMode]}**\nСделано - ${track.requestedBy}`)
    .setFooter({ text: 'Сделано LiztochekCode 💗', iconURL: inter.member.avatarURL({ dynamic: true })})
    .setColor('ff0000')
    .setTimestamp()

    inter.reply({ embeds: [embed], ephemeral: true });
}