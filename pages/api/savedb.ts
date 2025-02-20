// pages/api/saveDb.ts
import { NextApiResponse, NextApiRequest } from "next";
import { db } from "../../lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

interface LeadData {
  id: string;
  jobType?: string;
  localization?: string;
  budget?: number;
  email?: string;
  skills?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log("req.body", req.body);
      const { id }: LeadData = req.body;

      const leadsCollection = collection(db, "leads");
      const docRef = await addDoc(leadsCollection, {
        id,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);

      return res.status(200).json({ id: docRef.id,  success: true, message: "Lead created successfully." });
    } catch (error) {
      console.error("Error saving lead:", error);
      return res.status(500).json({ error: "Error creating lead." });
    }
  }

  if (req.method === "PATCH") {
    try {
      console.log("req.body", req.body);
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required for updating lead." });
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "At least one field is required to update." });
      }

      const leadRef = doc(db, "leads", id);

      await updateDoc(leadRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });

      return res.status(200).json({ success: true, message: "Lead updated successfully." });
    } catch (error) {
      console.error("Error updating lead:", error);
      return res.status(500).json({ error: "Error updating lead." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
