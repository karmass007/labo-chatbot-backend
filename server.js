const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const HF_TOKEN = process.env.HF_TOKEN; 

app.post('/chat', async (req, res) => {
    const message = req.body.message.toLowerCase();

    // 1. RÉPONSES INSTANTANÉES (Pas besoin d'IA, donc 0 attente)
    if (message.includes("horaire") || message.includes("ouvert") || message.includes("ferme")) {
        return res.json({ reply: "Le Laboratoire DU NORD est ouvert 24h/24 et 7j/7. Le Dr. CHAOUI Tarik assure la continuité des soins même la nuit et les jours fériés." });
    }
    if (message.includes("adresse") || message.includes("lieu") || message.includes("où") || message.includes("tetouan")) {
        return res.json({ reply: "Nous sommes situés à l'Av des FAR, Résidence HANIA 1, RDC, Tétouan. Juste à côté de la clinique du Croissant Rouge." });
    }
    if (message.includes("domicile") || message.includes("infirmier") || message.includes("déplacement")) {
        return res.json({ reply: "Oui, nous effectuons des prélèvements à domicile 24h/24. Appelez notre équipe au +212 658 02 01 90 pour fixer un rendez-vous." });
    }
    if (message.includes("glycémie") || message.includes("jeun") || message.includes("manger")) {
        return res.json({ reply: "Pour la glycémie et le bilan lipidique (cholestérol), un jeûne de 10 à 12h est nécessaire. Vous pouvez venir sans rendez-vous." });
    }
    if (message.includes("résultat") || message.includes("analyse")) {
        return res.json({ reply: "Vous pouvez consulter vos résultats en ligne via le bouton 'Serveur Résultats' sur notre site web avec vos identifiants." });
    }

    // 2. APPEL IA POUR LES AUTRES QUESTIONS (Si le mot-clé n'est pas trouvé)
    try {
        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/google/gemma-1.1-7b-it",
            { 
                inputs: `Assistant Labo DU NORD. Question: ${req.body.message}. Réponse courte:`,
                options: { wait_for_model: true }
            },
            { headers: { Authorization: `Bearer ${HF_TOKEN}` }, timeout: 20000 }
        );

        let reply = Array.isArray(response.data) ? response.data[0].generated_text : response.data.generated_text;
        const cleanReply = reply.split('Réponse courte:').pop().trim();
        res.json({ reply: cleanReply || "Bonjour ! Je suis l'assistant du Dr CHAOUI. Comment puis-je vous aider ?" });

    } catch (error) {
        res.json({ reply: "Je suis l'assistant du Dr. CHAOUI. Pour toute question urgente sur nos examens ou horaires (24h/24), vous pouvez nous appeler directement au +212 658 02 01 90." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Serveur hybride prêt"));
