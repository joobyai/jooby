import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Vérifie que ta clé API est bien définie dans .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { conversation, response_format: initialResponseFormat } = req.body;
      const response_format = initialResponseFormat || "text";

      console.log("📨 Requête reçue avec conversation:", JSON.stringify(conversation, null, 2));

      // Vérifie qu'une conversation existe, sinon initialise avec un message de bienvenue
      const messages = conversation && conversation.length > 0 ? conversation : [
        { role: "assistant", content: "Bonjour ! Je suis Jooby, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?" }
      ];

      // Ajout du contexte pour améliorer les réponses
      messages.unshift({
        role: "system",
        content: `Tu es Jooby, un assistant virtuel intelligent et amical. 
        Ton but est d'aider les utilisateurs avec des réponses claires, précises et utiles. 
        Si quelqu'un te pose une question ambiguë, demande plus de précisions. 
        Si quelqu'un parle d'emploi, adapte tes réponses en fonction de son profil et pose-lui des questions pour mieux l'aider.`
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 200,
        response_format: { type: response_format },
      });

      console.log("🔹 Réponse OpenAI:", JSON.stringify(response, null, 2));

      const message = response.choices[0].message;

      // Envoie la réponse à l'utilisateur
      res.status(200).json({ message });

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("🚨 Erreur OpenAI:", error.message);
        res.status(500).json({ error: "Échec de la communication avec OpenAI", details: error.message });
      } else {
        console.error("🚨 Erreur inconnue:", error);
        res.status(500).json({ error: "Une erreur inconnue s'est produite" });
      }
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
