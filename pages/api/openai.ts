// pages/api/openai.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialise OpenAI avec ta clé API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',  // Assure-toi que la clé API est configurée dans .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userMessage } = req.body;

      // Envoi la requête à OpenAI pour obtenir une réponse en utilisant GPT-4
const response = await openai.completions.create({
  model: "gpt-4",
  prompt: userMessage,  // Utilise prompt à la place de messages
  max_tokens: 100,
});

      // Envoie la réponse à l'utilisateur
      res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      res.status(500).json({ error: 'Échec de la communication avec OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}

