// pages/api/saveDb.ts
import { NextApiResponse, NextApiRequest } from "next";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface LeadData {
  id: string;
  jobType: string;
  localization: string;
  budget: number;
  email: string;
  skills: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("req.body", req.body);
      const { id, jobType, localization, budget, email, skills }: LeadData = req.body;

      if (!id || !localization || !budget || !email || !skills) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const leadsCollection = collection(db, "leads");
      await addDoc(leadsCollection, {
        id,
        jobType,
        localization,
        budget,
        email,
        skills,
        createdAt: serverTimestamp(),
      });

      return res.status(200).json({ success: true, message: "Lead saved successfully." });
    } catch (error) {
      console.error("Error saving lead:", error);
      return res.status(500).json({ error: "Error saving lead." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
