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

        **Important** :
        - Ne recommande pas d'emplois, ne donne pas de conseils.
        - Pose **une question à la fois**.
        - L'objectif est de **collecter les infos** pour envoyer les offres par GHL.
        - **Respecte cet ordre :**
          1️⃣ **Demander le prénom** de l’utilisateur.
          2️⃣ **Localisation**.
          3️⃣ **Langues parlées**.
          4️⃣ **Statut professionnel**.
          5️⃣ **Secteur d’activité et passions**.
          6️⃣ **Formation courte possible**.
          7️⃣ **Motivation sur une échelle de 1 à 10**.
          8️⃣ **Récupération du téléphone et de l’email**.

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
