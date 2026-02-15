const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// On récupère la clé depuis les réglages du serveur (Render)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", // Plus rapide et moins cher pour commencer
            messages: [
                {
                    role: "system", 
                    content: "Tu es l'assistant IA du Laboratoire DU NORD à Tétouan. Directeur : Dr. CHAOUI Tarik. Tu es expert, poli et tu réponds en français ou en arabe. Le labo est ouvert 24h/24 et 7j/7."
                },
                { role: "user", content: req.body.message }
            ]
        }, {
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
        });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Erreur IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
