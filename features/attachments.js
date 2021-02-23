module.exports = (client) => {
    client.on("message", (message) => {
        if (message.attachments.size) {
            message.react("👀");
        }
    });
};
