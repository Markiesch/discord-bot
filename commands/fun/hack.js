module.exports = {
    execute(message, args) {
        let counter = 0;
        const target = message.author;
        const responses = [
            `Hacking ${target.username} now...`,
            `[▖] Finding discord login... (2fa bypassed)`,
            `[▘] Found\nEmail: \`joesplayzMinecraft@aol.com\`\nPassword: \`PA55W0RD\``,
            `[▝] Fetching dms with closest friends (if there are any friends at all)`,
            `[▗] Last DM: "man i love my mommy"`,
            `[▖] Finding most common word...`,
            `[▘] const mostCommon = "e"`,
            `[▝] Injecting trojan virus into discriminator ${target.discriminator}`,
            `[▗] Virus injected, emotes stolen :peepee:`,
            `[▖] Setting up Epic Store account..`,
            `[▘] Hacking Epic Store account.... :chugMyJug:`,
            `[▝] Finding IP address`,
            `[▗] IP address: 127.0.0.1:895`,
            `[▖] Selling data to the Government...`,
            `[▘] Reporting account to discord for breaking TOS...`,
            `[▝] Hacking medical records`,
            `[▗] IMPORTANT HEALTH UPDATE: Subject's brain is EXTREMELY SMOOTH`,
            `Finished hacking ${target.username}`,
        ];
        message.channel.send(responses[0]).then((msg) => {
            msg.edit(responses[++counter]);
        });
    },
};
