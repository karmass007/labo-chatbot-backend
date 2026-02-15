const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// BASE DE DONNÉES EXHAUSTIVE - LABORATOIRE DU NORD
const LABO_KNOWLEDGE = [
    // --- INFOS GÉNÉRALES & CONTACTS ---
    {
        keywords: ["horaire", "ouvert", "ferme", "garde", "nuit", "dimanche", "férié"],
        response: "Le Laboratoire DU NORD est ouvert 24h/24 et 7j/7. Un service de garde est assuré en permanence. Assistance garde (nuit/fériés) : 06 58 02 61 00."
    },
    {
        keywords: ["adresse", "où", "situé", "esso", "station", "tetouan", "direction"],
        response: "Nous sommes situés à l'Avenue des FAR, Résidence HANIA 1, RDC, Tétouan (à côté de la station ESSO). Itinéraire : https://www.google.com/maps/dir//Laboratoire+DU+NORD+Tétouan"
    },
    {
        keywords: ["contact", "téléphone", "fixe", "assistance", "urgence", "numéro", "appel"],
        response: "Voici nos lignes directes :\n- Fixe : 05 39 72 45 59\n- Prélèvement domicile : 06 58 02 01 90\n- Assistance Jour : 06 58 02 00 80\n- Assistance Garde : 06 58 02 61 00"
    },

    // --- BIOCHIMIE & MÉTABOLISME ---
    {
        keywords: ["glycémie", "sucre", "cholestérol", "bilan lipidique", "triglycérides", "hdl", "ldl"],
        response: "Condition : Jeûne strict de 10 à 12h obligatoire. L'eau plate est autorisée. Délai : 1 jour."
    },
    {
        keywords: ["hb1ac", "glyquée"],
        response: "Hémoglobine glyquée (HbA1c) : Pas de jeûne nécessaire. Délai : 1 jour."
    },
    {
        keywords: ["acides aminés", "chromatographie"],
        response: "Acides aminés : Jeûne impératif. Centrifuger et congeler le plasma immédiatement. Délai : 7 jours."
    },

    // --- HORMONOLOGIE & MARQUEURS (Catalogue LNM6) ---
    {
        keywords: ["prolactine", "repos"],
        response: "Prolactine : Un repos de 20 minutes au calme au laboratoire est IMPÉRATIF avant le prélèvement. Délai : 1 jour."
    },
    {
        keywords: ["acth", "cortisol"],
        response: "ACTH : Prélèvement impératif entre 8h et 10h le matin. Placer dans la glace immédiatement. Délai : 1 jour."
    },
    {
        keywords: ["insuline", "homa"],
        response: "Insuline : Prélèvement à jeun. Sérum non hémolysé requis. Délai : 1 jour."
    },
    {
        keywords: ["érythropoïétine", "epo"],
        response: "Érythropoïétine : Prélèvement recommandé entre 7h30 et 12h00. Délai : 1 jour."
    },
    {
        keywords: ["rénine", "aldostérone"],
        response: "Rénine/Aldostérone : Préciser la position (Debout ou Couché) maintenue 30 min avant le test. Délai : 1 jour."
    },

    // --- INFECTIOLOGIE & PCR ---
    {
        keywords: ["pcr", "covid", "voyage", "adenovirus", "hpv", "moléculaire"],
        response: "Biologie Moléculaire (PCR) : Prélèvement selon protocole (respiratoire, urinaire ou sang). Délai : 1 à 7 jours selon le test."
    },
    {
        keywords: ["ist", "sexuelle", "chlamydia", "gonocoque", "syphilis", "hiv", "sida"],
        response: "Diagnostic IST : Urines (1ère miction) ou écouvillon. Confidentialité totale. Délai : 2 à 5 jours."
    },
    {
        keywords: ["hépatite", "charge virale", "hbv", "hcv"],
        response: "Hépatites : Sérologie (1 jour) ou Charge virale par PCR (7 jours)."
    },

    // --- HÉMOSTASE & GÉNÉTIQUE ---
    {
        keywords: ["anti-xa", "héparine", "lovenox"],
        response: "Activité anti-Xa : Plasma citraté. Congeler dans l'heure. Prélèvement à faire 4h après l'injection. Délai : 8 heures."
    },
    {
        keywords: ["caryotype", "génétique", "trisomie", "adn"],
        response: "Génétique : Consentement éclairé écrit obligatoire. Sang total sur héparine. Délai : 15 à 21 jours."
    },
    {
        keywords: ["spermogramme", "sperme", "infertilité"],
        response: "Spermogramme : Délai d'abstinence de 2 à 5 jours requis. Prélèvement au labo sur RDV. Délai : 2 jours."
    }
];

app.post('/chat', (req, res) => {
    try {
        const userMsg = req.body.message.toLowerCase();
        
        // Recherche si le test ou la question existe dans notre base
        let match = LABO_KNOWLEDGE.find(item => 
            item.keywords.some(key => userMsg.includes(key))
        );

        if (match) {
            res.json({ reply: match.response });
        } else {
            // SÉCURITÉ : Si l'analyse n'est pas reconnue
            res.json({ 
                reply: "Je ne trouve pas cette analyse spécifique dans ma base de données. Pour votre sécurité, veuillez contacter notre assistance pour confirmer les conditions :\n\n- Assistance Jour : 06 58 02 00 80\n- Assistance Garde (24h/24) : 06 58 02 61 00\n- Fixe : 05 39 72 45 59" 
            });
        }
    } catch (error) {
        res.status(500).json({ reply: "Erreur technique. Appelez le 05 39 72 45 59." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Serveur Laboratoire DU NORD Opérationnel"));
