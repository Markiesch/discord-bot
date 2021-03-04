module.exports = {
    category: "Fun",
    cooldown: "3s",
    description: "Test command, to test if the bot is running or not",
    callback: ({ message, client }) => {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    },
};
