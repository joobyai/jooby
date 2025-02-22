import React, { useState, useEffect } from "react";
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
  const [leadId, setLeadId] = useState<string | null>(null);

  const t = locale[language as keyof typeof Translations];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const setChatContext = async () => {
    const chatContext = [{ role: "system", content: t.context }];
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: chatContext }),
      });
      const { message } = await response.json();

      setChatMessages([{ role: "assistant", content: message.content }]);
      setLoading(false);
    } catch (error) {
      console.error("Error setting chat context:", error);
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    let nextQuestion = "";

    const missingInfo = [];
    if (!extractedInfo.skills) missingInfo.push("tes compétences");
    if (!extractedInfo.current_profession) missingInfo.push("ton expérience ou ton poste actuel");
    if (!extractedInfo.objective) missingInfo.push("le type de job que tu recherches");

    if (missingInfo.length > 0) {
      nextQuestion = `Merci ! Peux-tu me donner plus d'infos sur ${missingInfo.join(", ")} ?`;
    } else if (!extractedInfo.email || !extractedInfo.phone) {
      nextQuestion = `Parfait ! Pour recevoir les offres, peux-tu me donner ton **email** et ton **numéro de téléphone** ?`;
    }

    const payloadChat: ChatMessage[] = [...chatMessages, { role: "user", content: userInput }];

    setChatMessages([...chatMessages, { role: "user", content: userInput }]);
    setUserInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: payloadChat }),
      });
      const { message } = await response.json();

      const botResponse = message.content + (nextQuestion ? `\n\n${nextQuestion}` : "");

      setChatMessages([...chatMessages, { role: "assistant", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
    }
    setTyping(false);
  };

  useEffect(() => {
    setChatMessages([]);
    setLoading(true);
    setChatContext();
  }, [language]);

  useEffect(() => {
    if (leadId) {
      fetch("/api/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId }),
      }).catch((error) => console.error("Error saving data in cookies:", error));
    }
  }, [leadId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-900 text-white">
        <div className="animate-spin text-5xl font-bold">∞</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white p-4 relative overflow-hidden">
      {/* Language Selector */}
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-5xl font-bold">∞</div>
        <h1 className="text-2xl font-bold">Jooby</h1>
        <div className="text-3xl font-semibold mt-4">{t.title}</div>
      </div>

      {/* Chat Window */}
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

            {/* Input + Send Button */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Écris ton message..."
                className="w-full p-2 text-black rounded-md"
              />
              <button onClick={handleSendMessage} className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-500">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jooby;
