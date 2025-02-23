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

      // Récupération du contexte avec consignes strictes
      const context = `
        ${localeData[lang]?.context || "Je suis Jooby, ton assistant personnel pour trouver un emploi."}

        **Important** : 
        - Tu ne fais pas de recommandations d'emplois, tu poses des **questions étape par étape**.
        - Tu ne donnes pas de conseils.
        - Tu guides l'utilisateur **vers la collecte de ses informations** pour que nous puissions lui envoyer les offres.
        - Ne saute **aucune étape** du script.

        **Déroulement du dialogue** :
        1️⃣ Demande d’abord le **prénom** de l’utilisateur.
        2️⃣ Demande sa **localisation**.
        3️⃣ Vérifie s’il parle **plusieurs langues**.
        4️⃣ Demande s’il est **en recherche active d’emploi**.
        5️⃣ Demande ses **passions et secteur d’activité préféré**.
        6️⃣ Vérifie s’il est **ouvert à une formation courte**.
        7️⃣ Sur une échelle de **1 à 10**, demande sa motivation.
        8️⃣ **Collecte le téléphone** et **l’email** pour envoyer les opportunités via GHL.
      `.trim();

      // Construction des messages
      const messages = conversation && conversation.length > 0 ? [...conversation] : [];
      messages.unshift({ role: "system", content: context });

      // Ajouter un message d'accueil si la conversation est vide
      if (messages.length === 1) {
        messages.push({ role: "assistant", content: localeData[lang]?.nameQuestion || "Pour commencer, comment t’appelles-tu ?" });
      }

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
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
