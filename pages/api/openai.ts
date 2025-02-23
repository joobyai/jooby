import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Assure-toi que la clé API est bien dans .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { conversation, response_format: initialResponseFormat } = req.body;
      const response_format = initialResponseFormat || "text";

      console.log("📨 Requête reçue avec conversation:", JSON.stringify(conversation, null, 2));

      // Vérifie que la conversation contient bien un message initial
      if (!conversation || conversation.length === 0) {
        conversation.push({ role: "assistant", content: "Bienvenue ! Comment puis-je vous aider ?" });
        console.log("✅ Message de bienvenue ajouté");
      }

      // Ajoute un contexte au bot (optionnel mais améliore la qualité des réponses)
      const messages = [
        { role: "system", content: "Tu es Jooby, un assistant intelligent et amical qui aide les utilisateurs." },
        ...conversation,
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 100,
        response_format: { type: response_format },
      });

      console.log("🔹 Réponse OpenAI:", JSON.stringify(response, null, 2));

      const message = response.choices[0].message;

      // Envoie la réponse à l'utilisateur
      res.status(200).json({ message });

    } catch (error: any) {
      console.error("🚨 Erreur OpenAI:", error);
      res.status(500).json({ error: "Échec de la communication avec OpenAI", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
