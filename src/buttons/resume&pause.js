module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `В данный момент музыка не играет... попробуешь еще раз ? ❌`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Текущая песня ${queue.current.title} на паузе ✅` : `Текущая песня ${queue.current.title} играет ✅`}`, ephemeral: true});
}