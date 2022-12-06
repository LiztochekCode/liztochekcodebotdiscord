module.exports = {
    name: 'pause',
    description: 'пауза трека',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Сейчас не играет музыка ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'Трек на паузе!', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `Трек сейчас на паузе, ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Текущая песня ${queue.current.title} на паузе ✅` : `Что-то пошло не так ${inter.member}... попробуешь еще раз ? ❌` });
    },
};
