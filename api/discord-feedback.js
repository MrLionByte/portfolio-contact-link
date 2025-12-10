const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed. Must be POST.' });
        return;
    }

    if (!DISCORD_WEBHOOK_URL) {
        res.status(503).json({ error: 'Server configuration error: Discord Webhook URL is missing.' });
        return;
    }

    try {
        const { name, email, phone, linkedin, feedback } = req.body;

        if (!feedback) {
            res.status(400).json({ error: 'Missing required field: feedback message.' });
            return;
        }
        
        const payload = {
            content: "📢 **New Portfolio Contact!**",
            embeds: [{
                title: "Contact/Feedback Received",
                color: 3447003,
                fields: [
                    { name: "Name", value: name || "*Anonymous*", inline: true },
                    { name: "Phone", value: phone, inline: true },
                    { name: "Email", value: email || "*Anonymous*", inline: true },
                    { name: "Linkedin", value: linkedin || "*Anonymous*", inline: true },
                    { name: "Message", value: feedback, inline: false }
                ],
                timestamp: new Date().toISOString() // Show when the message was sent
            }]
        };

        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!discordResponse.ok) {
            console.error('Discord API Error:', discordResponse.status, await discordResponse.text());
            res.status(500).json({ error: 'Failed to relay message to Discord. Check server logs.' });
            return;
        }

        res.status(200).json({ message: 'Feedback submitted successfully!' });

    } catch (error) {
        console.error('Processing Error:', error);
        res.status(500).json({ error: 'Internal Server Error during processing.' });
    }
}