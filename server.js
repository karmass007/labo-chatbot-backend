const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// BASE DE DONNÉES FINALE - LABORATOIRE DU NORD (Dr. CHAOUI Tarik)
const LABO_KNOWLEDGE = [
    {
        keywords: ["horaire", "ouvert", "ferme", "quand", "heure", "garde", "nuit", "dimanche", "férié", "soir"],
        response: "Le Laboratoire DU NORD est ouvert 24h/24 et 7j/7. Un service de garde est assuré en permanence (nuit et jours fériés). Pour l'assistance garde, contactez le 06 58 02 61 00."
    },
    {
        keywords: ["adresse", "où", "lieu", "situé", "emplacement", "direction", "tetouan", "tétouan", "carte", "map", "localiser", "résidence", "esso", "station"],
        response: "Nous sommes situés à l'Avenue des FAR, Résidence HANIA 1, RDC, Tétouan. Le laboratoire se trouve juste à côté de la station ESSO. L'accès est aménagé pour les personnes à mobilité réduite. Itinéraire Google Maps : https://www.google.com/maps/dir//Laboratoire+DU+NORD+Tétouan"
    },
    {
        keywords: ["domicile", "déplacement", "maison", "chez moi", "infirmier", "rendez-vous", "venir", "déplacer"],
        response: "Nous disposons d'une équipe dédiée aux prélèvements à domicile disponible 24h/24. Pour prendre rendez-vous, appelez le 06 58 02 01 90."
    },
    {
        keywords: ["contact", "téléphone", "appel", "numéro", "joindre", "fixe", "assistance", "urgence"],
        response: "Voici nos numéros :\n- Fixe : 05 39 72 45 59\n- Prélèvement à domicile : 06 58 02 01 90\n- Assistance Jour : 06 58 02 00 80\n- Assistance Garde (nuit/fériés) : 06 58 02 61 00"
    },
    {
        keywords: ["résultat", "analyses", "prêt", "télécharger", "consulter", "en ligne", "code", "identifiant", "serveur"],
        response: "Consultez vos résultats en ligne sur https://labodunord.ma via l'onglet 'Espace Patient'. Utilisez les identifiants fournis lors de votre prélèvement."
    },
    {
        keywords: ["jeun", "manger", "boire", "glycémie", "sucre", "cholestérol", "bilan", "lipide", "triglycérides"],
        response: "Un jeûne de 10 à 12 heures est nécessaire pour la glycémie et le bilan lipidique (cholestérol). L'eau plate est autorisée."
    },
    {
        keywords: ["prolactine", "repos", "calme", "20 min"],
        response: "Pour le dosage de la Prolactine, il est impératif de rester au repos au laboratoire pendant 20 minutes avant le prélèvement pour garantir la précision du résultat."
    },
    {
        keywords: ["prix", "tarif", "combien", "coût", "devis", "ordonnance", "assurance", "cnops", "cnss", "mutuelle"],
        response: "Pour un devis précis ou vérifier une convention (CNSS, CNOPS, etc.), envoyez une photo de votre ordonnance par WhatsApp au 06 58 02 01 90."
    },
    {
        keywords: ["pcr", "covid", "voyage", "moléculaire", "rt-pcr"],
        response: "Nous réalisons les tests PCR pour voyages ou diagnostic avec un rendu de résultat rapide grâce à notre plateau technique spécialisé."
    },
    {
        keywords: ["reproduction", "infertilité", "sperme", "spermogramme", "couple"],
        response: "Le Laboratoire DU NORD est expert en biologie de la reproduction (étude de l'infertilité, spermogramme, génomique)."
    },
    {
        keywords: ["site", "web", "internet", "lien"],
        response: "Retrouvez toutes nos informations et services sur notre site officiel : https://labodunord.ma"
    }
];

app.post('/chat', (req, res) => {
    try {
        const userMessage = req.body.message.toLowerCase();
        
        let match = LABO_KNOWLEDGE.find(item => 
            item.keywords.some(key => userMessage.includes(key))
        );

        if (match) {
            res.json({ reply: match.response });
        } else {
            res.json({ 
                reply: "Bonjour ! Je suis l'assistant du Dr. CHAOUI. Je peux vous aider pour :\n- Vos résultats en ligne\n- L'adresse (à côté de la station ESSO)\n- Les prélèvements à domicile (06 58 02 01 90)\n- Les horaires 24h/24\n\nQuelle est votre question ?" 
            });
        }
    } catch (error) {
        res.status(500).json({ reply: "Désolé, une erreur est survenue. Contactez le 05 39 72 45 59." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Serveur Laboratoire DU NORD opérationnel sur le port ${PORT}`);
});
