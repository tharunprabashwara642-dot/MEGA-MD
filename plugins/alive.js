import os from 'os';
import process from 'process';

export default {
    command: 'alive',
    aliases: ['status', 'bot'],
    category: 'general',
    description: 'Check bot status and system info',
    usage: '.alive',
    isPrefixless: true,
    async handler(sock, message, args, context) {
        const { chatId, config } = context;
        try {
            let uptime = Math.floor(process.uptime());
            const days = Math.floor(uptime / 86400);
            uptime %= 86400;
            const hours = Math.floor(uptime / 3600);
            uptime %= 3600;
            const minutes = Math.floor(uptime / 60);
            const seconds = (Number(uptime) % Number(60));

            const uptimeParts = [];
            if (days) uptimeParts.push(`${days}d`);
            if (hours) uptimeParts.push(`${hours}h`);
            if (minutes) uptimeParts.push(`${minutes}m`);
            if (seconds || uptimeParts.length === 0) uptimeParts.push(`${seconds}s`);

            const uptimeText = uptimeParts.join(' ');
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
            const usedMem = (Number(totalMem) - Number(freeMem)).toFixed(2);
            const cpuLoad = os.loadavg()[0].toFixed(2);
            const platform = os.platform();
            const arch = os.arch();
            const nodeVersion = process.version;

            const text = `👋 *Hey! I am ${config.botName}*\n` +
                `*Your Personal AI Assistant is Active & Running!* ⚡\n\n` +
                `👤 *Owner:* ${config.botOwner}\n` +
                `⚙️ *Version:* ${config.version}\n` +
                `⏱️ *Uptime:* ${uptimeText}\n` +
                `📊 *RAM:* ${usedMem} MB / ${totalMem} MB\n` +
                `💻 *Platform:* ${platform} (${arch})\n` +
                `🟢 *Node.js:* ${nodeVersion}\n\n` +
                `> Powered by Tharun Prabhashwara`;

            // ඔයාගේ රූපයක Direct Image URL එකක් මෙතැනට දාන්න පුළුවන්
            const imageUrl = 'https://i.ibb.co/68x5G7X/avatar.jpg'; 

            await sock.sendMessage(chatId, {
                image: { url: imageUrl },
                caption: text,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363319098372999@newsletter',
                        newsletterName: "Tharun's AI Assistant Updates",
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });
        }
        catch (error) {
            console.error('Error in alive command:', error);
            await sock.sendMessage(chatId, { text: '⚡ Bot is online and ready!' }, { quoted: message });
        }
    }
};
