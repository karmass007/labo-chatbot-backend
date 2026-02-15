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
            "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
            { 
                inputs: `<s>[INST] Tu es l'assistant du Laboratoire DU NORD à Tétouan. Directeur : Dr. CHAOUI Tarik. 
                Réponds poliment et très brièvement en français ou arabe. 
                Horaires: 24h/24. 
                Question: ${req.body.message} [/INST]`,
                parameters: { 
                    max_new_tokens: 250, 
                    temperature: 0.7
                },
                options: {
                    wait_for_model: true // CRUCIAL : Attend que l'IA soit prête au lieu de faire une erreur
                }
            },
            { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
        );

        let fullText = Array.isArray(response.data) ? response.data[0].generated_text : response.data.generated_text;
        let reply = fullText.split('[/INST]').pop().trim();
        
        res.json({ reply: reply });
    } catch (error) {
        console.error("Erreur détaillée:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "IA en cours de réveil" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
