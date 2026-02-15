const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// VOTRE BASE DE DONNÉES DE CONNAISSANCES (Ajoutez tout ce que vous voulez ici)
const LABO_KNOWLEDGE = [
    { keywords: ["prolactine", "repos"], response: "Pour la Prolactine, il faut impérativement rester au repos au laboratoire 20 minutes avant le prélèvement." },
    { keywords: ["horaire", "ouvert", "ferme", "nuit", "garde"], response: "Nous sommes ouverts 24h/24 et 7j/7, y compris les jours fériés." },
    { keywords: ["adresse", "lieu", "où", "situé"], response: "Av des FAR, Résidence HANIA 1, RDC, Tétouan (à côté du Croissant Rouge)." },
    { keywords: ["domicile", "maison", "déplacement"], response: "Prélèvements à domicile disponibles 24h/24. Appelez le +212 658 02 01 90." },
    { keywords: ["jeun", "manger", "glycémie", "sucre", "cholestérol"], response: "Un jeûne de 10h à 12h est nécessaire pour la glycémie et le bilan lipidique." },
    { keywords: ["prix", "tarif", "combien"], response: "Envoyez-nous votre ordonnance par WhatsApp au +212 658 02 01 90 pour un devis précis." },
    { keywords: ["résultat", "analyses"], response: "Consultez vos résultats sur notre site via l'onglet 'Serveur Résultats' avec vos codes." }
];

app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    // Recherche de la meilleure réponse
    let bestMatch = LABO_KNOWLEDGE.find(item => 
        item.keywords.some(key => userMessage.includes(key))
    );

    if (bestMatch) {
        res.json({ reply: bestMatch.response });
    } else {
        res.json({ reply: "Je n'ai pas trouvé la réponse exacte. Posez-moi une question sur les horaires, les examens (ex: Prolactine) ou appelez le +212 658 02 01 90." });
    }
});

app.listen(10000, () => console.log("Chatbot autonome actif"));
