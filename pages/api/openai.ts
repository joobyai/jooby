// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Assure-toi que la clé API est configurée dans .env.local
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { conversation, response_format: initialResponseFormat } = req.body;
      const response_format = initialResponseFormat || "text";

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: conversation,
        max_tokens: 100,
        response_format: { type: response_format },
      });
      const message = response.choices[0].message;

      // Envoie la réponse à l'utilisateur
      res.status(200).json({ message });
    } catch (error) {
      console.error("Erreur OpenAI:", error);
      res.status(500).json({ error: "Échec de la communication avec OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}

