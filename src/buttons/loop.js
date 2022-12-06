const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['disabled', 'track', 'queue'];

    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не играет... попробуешь еще раз ? ❌`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)
    
    return inter.reply({ content: `цикл мод был изменен на **${methods[queue.repeatMode]}**.✅`})



}