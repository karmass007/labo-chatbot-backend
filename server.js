const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// BASE DE CONNAISSANCES EXHAUSTIVE - LABORATOIRE DU NORD (Dr. CHAOUI Tarik)
const LABO_KNOWLEDGE = [
    {
        keywords: ["horaire", "ouvert", "ferme", "quand", "heure", "garde", "nuit", "dimanche", "férié", "soir"],
        response: "Le Laboratoire DU NORD est ouvert 24h/24 et 7j/7. Le Dr. CHAOUI Tarik assure la continuité des soins et des analyses d'urgence sans interruption, même les week-ends et jours fériés."
    },
    {
        keywords: ["adresse", "où", "lieu", "situé", "emplacement", "direction", "tetouan", "tétouan", "carte", "map", "localiser", "résidence"],
        response: "Nous sommes situés à l'Avenue des FAR, Résidence HANIA 1, RDC, Tétouan. Le laboratoire se trouve juste à côté de la clinique du Croissant Rouge (Al Hilal Al Ahmar). L'accès est aménagé pour les personnes à mobilité réduite."
    },
    {
        keywords: ["domicile", "déplacement", "maison", "chez moi", "infirmier", "rendez-vous", "venir", "déplacer"],
        response: "Nous disposons d'une équipe dédiée aux prélèvements à domicile disponible 24h/24. Pour prendre rendez-vous, appelez le +212 658 02 01 90 ou envoyez votre adresse par WhatsApp."
    },
    {
        keywords: ["résultat", "analyses", "prêt", "télécharger", "consulter", "en ligne", "code", "identifiant", "serveur", "téléchargement"],
        response: "Vos résultats sont sécurisés et consultables en ligne. Allez sur notre site labodunord.ma, cliquez sur 'Serveur Résultats'. Utilisez l'identifiant et le mot de passe imprimés sur votre ticket de prélèvement."
    },
    {
        keywords: ["jeun", "manger", "boire", "estomac", "glycémie", "sucre", "cholestérol", "bilan", "lipide", "triglycérides"],
        response: "Pour la glycémie et le bilan lipidique (cholestérol), un jeûne de 10 à 12 heures est obligatoire (vous pouvez boire de l'eau plate). Pour les autres examens, le jeûne est recommandé mais pas toujours obligatoire."
    },
    {
        keywords: ["prolactine", "repos", "calme", "20 min"],
        response: "Pour le dosage de la Prolactine, il est impératif de rester au repos (assis calmement) au laboratoire pendant 20 minutes avant le prélèvement pour ne pas fausser les résultats à cause du stress."
    },
    {
        keywords: ["prix", "tarif", "combien", "coût", "devis", "ordonnance", "assurance", "cnops", "cnss", "mutuelle", "cimr"],
        response: "Nous acceptons les principales mutuelles (CNSS, CNOPS, etc.). Pour obtenir un devis exact ou vérifier une prise en charge, envoyez une photo de votre ordonnance par WhatsApp au +212 658 02 01 90."
    },
    {
        keywords: ["pcr", "covid", "voyage", "moléculaire", "rt-pcr"],
        response: "Nous réalisons les tests PCR et la biologie moléculaire avec des résultats rapides pour les voyages ou le diagnostic médical, grâce à notre plateau technique de haute technologie."
    },
    {
        keywords: ["reproduction", "infertilité", "sperme", "spermogramme", "couple"],
        response: "Le Laboratoire DU NORD est spécialisé en biologie de la reproduction (étude de l'infertilité du couple, spermogramme, biochimie séminale et génomique)."
    },
    {
        keywords: ["contact", "téléphone", "appel", "whatsapp", "fixe", "urgence", "numéro", "mail", "email"],
        response: "Vous pouvez nous joindre sur le fixe au +212 539 72 45 59, sur WhatsApp au 06 58 02 01 90, ou par email à contact@labodunord.ma."
    },
    {
        keywords: ["qualité", "iso", "fiable", "confiance"],
        response: "Le laboratoire s'engage dans un système de management de la qualité (norme ISO 9001v2015) pour garantir des résultats fiables, précis et rendus dans les plus brefs délais."
    }
];

app.post('/chat', (req, res) => {
    try {
        const userMessage = req.body.message.toLowerCase();
        
        // Recherche du meilleur match en fonction des mots-clés
        let match = LABO_KNOWLEDGE.find(item => 
            item.keywords.some(key => userMessage.includes(key))
        );

        if (match) {
            res.json({ reply: match.response });
        } else {
            // Message d'accueil / aide si aucun mot-clé n'est trouvé
            res.json({ 
                reply: "Bonjour ! Je suis l'assistant du Dr. CHAOUI. Je peux vous aider pour : \n- Vos résultats en ligne\n- Les horaires (24h/24)\n- Les prélèvements à domicile\n- Les conditions d'examens (jeûne, Prolactine...)\n\nQuelle est votre question ?" 
            });
        }
    } catch (error) {
        res.status(500).json({ reply: "Désolé, une erreur est survenue. Veuillez appeler le +212 658 02 01 90." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`SERVEUR AUTONOME LABO DU NORD ACTIF`);
    console.log(`Port: ${PORT} | Mode: 100% Gratuit & Illimité`);
    console.log(`=========================================`);
});
