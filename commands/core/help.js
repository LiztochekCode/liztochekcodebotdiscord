const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Получить все команды от бота!",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Бот сделан строго by LiztochekCode.')
        .addFields([ { name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'LiztochekCode 💗', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};