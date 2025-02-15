import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook URL not configured." });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(`Failed to send payload: ${response.statusText}`);
      }

      return res.status(200).json({ success: true, message: "Payload sent successfully." });
    } catch (error) {
      console.error("Error sending payload:", error);
      return res.status(500).json({ error: "Error sending payload." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}