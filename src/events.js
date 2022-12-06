const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Ошибка выдается из очереди ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Ошибка выдается из соединения ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Начинаю играть ${track.title} в ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Назад')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Пропустить')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Пауза & Продолжить')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Цикл')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Очередь')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Трек ${track.title} добавлено в очередь ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Меня вручную отключили от голосового канала, очистив очередь... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('В голосовом канале никого нет, выход из голосового канала... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('Очередь очистилась ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Все песни в плейлисте добавлены в очередь ✅`);
});