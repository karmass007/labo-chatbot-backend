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
            "https://router.huggingface.co/hf-inference/models/google/gemma-1.1-7b-it",
            { 
                inputs: `Tu es l'assistant médical du Dr CHAOUI à Tétouan. Réponds très brièvement en français. 
                Question: ${req.body.message}
                Réponse:`,
                options: { wait_for_model: true }
            },
            { 
                headers: { Authorization: `Bearer ${HF_TOKEN}` },
                timeout: 45000 // On laisse 45 secondes au modèle pour se réveiller
            }
        );

        let reply = Array.isArray(response.data) ? response.data[0].generated_text : response.data.generated_text;
        
        // On coupe pour ne garder que la réponse de l'IA
        const cleanReply = reply.split('Réponse:').pop().trim();
        
        if(cleanReply) {
            res.json({ reply: cleanReply });
        } else {
            throw new Error("Réponse vide");
        }

    } catch (error) {
        console.error("Erreur détaillée:", error.message);
        // Message de secours intelligent
        res.json({ reply: "Pour la glycémie, il faut être à jeun de 10h à 12h. Le labo est ouvert 24h/24. Pour plus de détails, appelez le +212 658 02 01 90." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Serveur opérationnel"));
