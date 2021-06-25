module.exports = {
    description: "Test command, to test if the bot is running or not",
    execute(message) {
        message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
    },
};
