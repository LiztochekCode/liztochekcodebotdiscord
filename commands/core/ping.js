const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Узнать пинг!",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`Понг! Пинг ${Math.round(client.ws.ping)}мс 🛰️, Последняя активность ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`)

    },
};