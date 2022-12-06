module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не воспроизводится... повторите попытку ? ❌`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Текущая музыка ${queue.current.title} пропущена ✅` : `Что-то пошло не так ${inter.member}... повторите попытку ? ❌`, ephemeral: true});
}