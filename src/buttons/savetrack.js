const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не играет... попробуешь еще раз ? ❌`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.current.title}`)
                .setURL(queue.current.url)
                .addFields(
                    { name: ':hourglass: Duration:', value: `\`${queue.current.duration}\``, inline: true },
                    { name: 'Song by:', value: `\`${queue.current.author}\``, inline: true },
                    { name: 'Views :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                    { name: 'Song URL:', value: `\`${queue.current.url}\`` }
                )
                .setThumbnail(queue.current.thumbnail)
                .setFooter({ text: `from the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.reply({ content: `Я отправил вам название музыки в личные сообщения ✅`, ephemeral: true });
    }).catch(error => {
        return inter.reply({ content: `Не удалось отправить вам личное сообщение... попробуйте еще раз ? ❌`, ephemeral: true });
    });


}
