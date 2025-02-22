import React, { useState, useEffect, useCallback } from "react";
import Translations from "../lib/locale";
import locale from "../lib/locale";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Jooby = () => {
  const [language, setLanguage] = useState<keyof typeof Translations>("en");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<Record<string, string>>({});
  const [isContextSet, setIsContextSet] = useState(false);

  const t = locale[language];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const setChatContext = useCallback(async () => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: [{ role: "system", content: t.context }] }),
      });

      const { message } = await response.json();
      setChatMessages([{ role: "assistant", content: message.content }]);
      setIsContextSet(true);
      setLoading(false);
    } catch (error) {
      console.error("Error setting chat context:", error);
      setIsContextSet(false);
      setLoading(false);
    }
  }, [t.context]);

  const startChat = () => {
    setChatOpen(true);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    let nextQuestion = "";
    const missingInfo = [];
    if (!extractedInfo.skills) missingInfo.push("tes compétences");
    if (!extractedInfo.current_profession) missingInfo.push("ton expérience ou ton poste actuel");
    if (!extractedInfo.objective) missingInfo.push("le type de job que tu recherches");

    if (missingInfo.length > 0) {
      nextQuestion = `Merci ! Pour mieux t'aider, peux-tu me donner plus d'infos sur ${missingInfo.join(", ")} ?`;
    } else if (!extractedInfo.email || !extractedInfo.phone) {
      nextQuestion = `Parfait ! Je viens de vérifier et j'ai plusieurs opportunités qui correspondent à ton profil. 🎯  

Pour te les envoyer dans l'heure, peux-tu me donner ton **email** et ton **numéro de téléphone** ? 📩📱  
Ne t'inquiète pas, ces infos ne seront utilisées que pour t'envoyer ces offres. 😉`;
    }

    const updatedChat: ChatMessage[] = [...chatMessages, { role: "user", content: userInput }];
    setChatMessages(updatedChat);
    setUserInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: updatedChat }),
      });

      const { message } = await response.json();
      const botResponse = message.content + (nextQuestion ? `\n\n${nextQuestion}` : "");

      setChatMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
    }

    setTyping(false);
  };

  const extractInfoFromChat = useCallback(async () => {
    if (chatMessages.length < 2) return;

    const payloadChat: ChatMessage[] = [
      ...chatMessages,
      { role: "system", content: 'Complete the following JSON if the information exists and return only the JSON. {email: "", name: "", current_profession: "", objective: "", skills: ""}' },
    ];

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: payloadChat }),
      });

      const { message } = await response.json();
      setExtractedInfo(JSON.parse(message.content));
    } catch (error) {
      console.error("Error extracting information from conversation:", error);
    }
  }, [chatMessages]);

  useEffect(() => {
    setChatMessages([]);
    setIsContextSet(false);
    setLoading(true);
    setChatContext();
  }, [language, setChatContext]);

  useEffect(() => {
    extractInfoFromChat();
  }, [chatMessages, extractInfoFromChat]);

  if (loading || !isContextSet) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-900 text-white">
        <div className="animate-spin text-5xl font-bold">∞</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 flex space-x-2 z-50">
        <button
          onClick={() => handleLanguageChange("fr")}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${language === "fr" ? "bg-green-600" : "bg-gray-700"}`}
        >
          FR
        </button>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${language === "en" ? "bg-green-600" : "bg-gray-700"}`}
        >
          EN
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-5xl font-bold">∞</div>
        <h1 className="text-2xl font-bold">Jooby</h1>
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl mt-6">
          <button onClick={startChat} className="w-full rounded-md bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-500 mt-4">
            {t.onlineJob}
          </button>
        </div>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-80 z-50">
          <div className="relative w-full max-w-4xl bg-gray-700 p-6 rounded-lg shadow-xl">
            <button onClick={() => setChatOpen(false)} className="absolute top-2 right-2 text-white text-3xl">
              &times;
            </button>
            <div className="overflow-y-auto max-h-96 w-full space-y-4 mb-4 p-4 bg-gray-800 rounded-md">
              {chatMessages.map((msg, index) => (
                <p key={index} className="text-white">
                  <strong>{msg.role === "user" ? `${t.userIdentifier}:` : "Jooby:"}</strong> {msg.content}
                </p>
              ))}
              {typing && <p className="text-gray-400">{t.typing}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jooby;
