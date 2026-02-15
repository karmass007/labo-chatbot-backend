const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const HF_TOKEN = process.env.HF_TOKEN; 

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-v0.1",
            { 
                inputs: `Assistant Labo DU NORD Tétouan. Question: ${req.body.message}. Réponse:`,
                options: { wait_for_model: true }
            },
            { headers: { Authorization: `Bearer ${HF_TOKEN}` }, timeout: 30000 }
        );

        let reply = "";
        if (Array.isArray(response.data)) {
            reply = response.data[0].generated_text;
        } else {
            reply = response.data.generated_text;
        }

        // On nettoie la réponse pour ne garder que la partie après "Réponse:"
        const cleanReply = reply.split('Réponse:').pop().trim();
        res.json({ reply: cleanReply || "Comment puis-je vous aider ?" });

    } catch (error) {
        console.error("Erreur:", error.message);
        res.json({ reply: "Bonjour ! Je suis l'assistant du Dr. CHAOUI. Je peux vous renseigner sur nos horaires 24h/24 ou nos prélèvements à domicile au +212 658 02 01 90." });
    }
});

app.listen(10000);
