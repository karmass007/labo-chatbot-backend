const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Clé secrète Hugging Face récupérée depuis Render
const HF_TOKEN = process.env.HF_TOKEN; 

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/MistralAI/Mistral-7B-Instruct-v0.2",
            { 
                inputs: `<s>[INST] Tu es l'assistant du Laboratoire DU NORD à Tétouan. Directeur : Dr. CHAOUI Tarik. 
                Réponds poliment et brièvement en français ou arabe. 
                Horaires: 24h/24 et 7j/7. 
                Prélèvements domicile: +212 658 02 01 90. 
                Question: ${req.body.message} [/INST]`,
                parameters: { max_new_tokens: 250, temperature: 0.7 }
            },
            { headers: { Authorization: `Bearer ${HF_TOKEN}` } }
        );

        // Extraction de la réponse propre
        let fullText = response.data[0].generated_text;
        let reply = fullText.split('[/INST]').pop().trim();
        
        res.json({ reply: reply });
    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ error: "L'IA est momentanément indisponible." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
