const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'включить или выключить цикл',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'виды циклов',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Музыка не играет ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Ты должен сначала выключить цикл режим ( /loop disable ) ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Цикл мод **enabled** вся очередь будет повторяться бесконечно 🔁` : `Что-то пошло не так ${inter.member}... попробуешь еще раз ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Цикл режим **disabled**` : `Что-то пошло не так ${inter.member}... попробуешь еще раз ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Ты должен сначала выключить цикл мод (/loop Disable) ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Цикл режим **enabled** текущая песня будет повторяться бесконечно (вы можете завершить цикл с помощью /loop disabled)` : `Что-то пошло не так ${inter.member}... попробуешь еще раз ? ❌` });
                break
            }
        }
       
    },
};