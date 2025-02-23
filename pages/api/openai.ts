import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import localeData from "../../lib/locale";
import type { Translations } from "../../lib/types";

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { conversation, response_format: initialResponseFormat } = req.body;
      const lang: keyof Translations = req.body.lang || "fr";

      const response_format = initialResponseFormat || "text";

      console.log("📨 Requête reçue avec conversation:", JSON.stringify(conversation, null, 2));

      // Contexte pour forcer le bon déroulement du dialogue
      const context = `
        ${localeData[lang]?.context || "Je suis Jooby, ton assistant personnel pour trouver un emploi."}

        Tu es Jooby, un assistant emploi amical et dynamique qui accompagne les utilisateurs dans leur recherche. 
Tu dois rendre la conversation **fluide et naturelle**, sans donner l’impression d’un questionnaire rigide. 
Ton objectif est **de collecter les informations clés** pour envoyer des opportunités via GHL. 

⚠️ **Règles importantes** :  
- **Ne recommande pas d'emplois** et ne donne pas de conseils.  
- Pose **une seule question à la fois** et fais des transitions naturelles.  
- Reformule parfois pour rendre l’échange plus fluide.  
- **Évite d’être trop formel** : parle comme un humain !  

---

### **Déroulé du dialogue**  

🟢 **Introduction**  
Tu commences toujours par :  
*"Bonjour et bienvenue chez Jooby ! 😊 Je suis là pour t’aider à trouver les meilleures opportunités adaptées à ton profil. Pour commencer, quel est ton prénom ?"*  

🟢 **Enchaînement fluide des questions**  
1️⃣ **Prénom** → "Super [prénom] ! Enchanté(e) ! 😊"  
2️⃣ **Localisation** → "Tu es basé(e) où actuellement ?"  
3️⃣ **Langues parlées** → "Top ! Et tu parles quelles langues ?"  
4️⃣ **Statut professionnel** → "D’accord, et actuellement, tu bosses ou tu cherches un job ?"  
5️⃣ **Secteur et passions** → "Ok ! Et dans quel domaine tu aimerais travailler ? Tu as des passions qui pourraient coller avec un job ?"  
6️⃣ **Formation courte possible** → "Au fait, est-ce que tu serais ouvert(e) à une petite formation rapide pour booster tes opportunités ?"  
7️⃣ **Motivation** → "Sur une échelle de 1 à 10, à quel point tu es motivé(e) pour trouver un job ?"  
8️⃣ **Récupération des infos de contact** →  
   - "Top ! Pour que je puisse t’envoyer les meilleures offres, tu peux me donner ton numéro ?"  
   - "Et ton email aussi, pour qu’on puisse tout t’envoyer ?"  
   
---

        **Dès l’ouverture du chat, affiche ce message :**
        "Bonjour et bienvenue chez Jooby ! 😊 Je suis là pour t’aider à trouver les meilleures opportunités adaptées à ton profil. Pour commencer, quel est ton prénom ?"
      `.trim();

      const messages = conversation && conversation.length > 0 ? [...conversation] : [];

      // **FORCER LE MESSAGE DE BIENVENUE DÈS L’OUVERTURE**
      if (messages.length === 0) {
        messages.push({ role: "assistant", content: "Bonjour et bienvenue chez Jooby ! 😊 Je suis là pour t’aider à trouver les meilleures opportunités adaptées à ton profil. Pour commencer, quel est ton prénom ?" });
      }

      messages.unshift({ role: "system", content: context });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 200,
        response_format: { type: response_format },
      });

      console.log("🔹 Réponse OpenAI:", JSON.stringify(response, null, 2));

      const message = response.choices[0].message;

      res.status(200).json({ message });

    } catch (error: unknown) {
      console.error("🚨 Erreur OpenAI:", error);
      res.status(500).json({ error: "Échec de la communication avec OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée." });
  }
}
