import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import localeData from "../../lib/local"; // Import du fichier de traduction

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { conversation, response_format: initialResponseFormat, lang = "fr" } = req.body;
      const response_format = initialResponseFormat || "text";

      console.log("📨 Requête reçue avec conversation:", JSON.stringify(conversation, null, 2));

      // Récupération du contexte depuis /lib/local.ts
      const context = localeData[lang]?.context || "Je suis Jooby, ton assistant personnel pour trouver un emploi.";

      // Ajout du contexte en tant que message "system"
      const messages = conversation && conversation.length > 0 ? conversation : [];
      messages.unshift({ role: "system", content: context });

      // Ajouter un message de bienvenue si la conversation est vide
      if (messages.length === 1) {
        messages.push({ role: "assistant", content: localeData[lang]?.welcome || "Bonjour ! Je suis Jooby, ton assistant virtuel." });
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
