module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Сейчас песни не играют... попробуешь еще раз ? ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Музыки до этого не найдено ${inter.member}... попробуешь еще раз ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Играет **previous** трек ✅`, ephemeral: true});
}
