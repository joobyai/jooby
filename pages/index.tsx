import React, { useState, useEffect } from "react";

const IndexPage = () => {
  const [chatContext, setChatContext] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!chatContext) return;
    setExtractedInfo(extractInfoFromChat(chatContext));
  }, [chatContext]);

  useEffect(() => {
    if (!extractedInfo) return;
    setLeadId(generateLeadId(extractedInfo));
  }, [extractedInfo]);

  useEffect(() => {
    if (leadId) {
      saveLeadToDatabase(leadId, extractedInfo);
    }
  }, [leadId]);

  const extractInfoFromChat = (chat) => {
    return { extracted: true };
  };

  const generateLeadId = (info) => {
    return "lead_" + Math.random().toString(36).substring(2, 9);
  };

  const saveLeadToDatabase = async (id, info) => {
    try {
      const response = await fetch("/api/savedb", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...info }),
      });
      const data = await response.json();
      console.log("Lead saved:", data);
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: userInput }]);
    setUserInput("");
    setTyping(true);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: chatMessages }),
      });
      const { message } = await response.json();
      setChatMessages([...chatMessages, { role: "assistant", content: message.content }]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
    }
    setTyping(false);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold">Bienvenue sur Jooby.ai</h1>
      <p>Le contenu sera ici...</p>
      <button onClick={() => setChatOpen(!chatOpen)} className="bg-blue-500 p-2 mt-4">Ouvrir Chat</button>
      {chatOpen && (
        <div className="chat-window">
          {chatMessages.map((msg, index) => (
            <p key={index} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
              <strong>{msg.role === "user" ? "Toi" : "Jooby"}:</strong> {msg.content}
            </p>
          ))}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="p-2 bg-gray-700 text-white w-full mt-2"
            placeholder="Écris ici..."
          />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
