module.exports = {
    category: "Fun",
    cooldown: "60s",
    callback: ({ message, client }) => {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    },
};
