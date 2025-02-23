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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { conversation } = req.body;

    if (!conversation || !Array.isArray(conversation)) {
      console.error("🚨 Erreur : conversation invalide ou absente :", conversation);
      return res.status(400).json({ error: "Conversation invalide ou absente" });
    }

    console.log("📨 Demande envoyée à OpenAI:", JSON.stringify(conversation, null, 2));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversation,
      max_tokens: 100,
    });

    console.log("🔹 Réponse OpenAI complète:", JSON.stringify(response, null, 2));

    // Vérifie si la réponse est valide
    if (!response.choices || response.choices.length === 0) {
      console.error("🚨 Erreur : Réponse OpenAI invalide:", response);
      return res.status(500).json({ error: "Réponse OpenAI invalide" });
    }

    const message = response.choices[0].message;

    if (!message || !message.content) {
      console.error("🚨 Erreur : Message OpenAI invalide:", message);
      return res.status(500).json({ error: "Message OpenAI invalide" });
    }

    console.log("✅ Réponse finale envoyée au client:", message.content);

    res.status(200).json({ message });

  } catch (error) {
    console.error("🚨 Erreur OpenAI:", error);
    res.status(500).json({ error: "Échec de la communication avec OpenAI" });
  }
}

