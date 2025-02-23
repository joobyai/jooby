import React, { useState, useEffect } from "react";
import localeData from "../lib/locale";
import type { TranslationContent } from "../lib/types";
import type { Translations } from "../lib/types";

const handleOpenChat = () => {
  setChatOpen(true);
  if (chatMessages.length === 0) {
    setChatMessages([
      { role: "assistant", content: "Bonjour et bienvenue chez Jooby ! 😊 Je suis là pour t’aider à trouver les meilleures opportunités adaptées à ton profil. Pour commencer, quel est ton prénom ?" }
    ]);
  }
};


interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Jooby = () => {
const [language, setLanguage] = useState<keyof Translations>("en");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [extractedInfo, setExtractedInfo] = useState<Record<string, string>>({});
  const [leadId, setLeadId] = useState<string | null>(null);

 const t: TranslationContent = localeData[language];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const updatedChat: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: userInput },
    ];

    setChatMessages(updatedChat);
    setUserInput("");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { conversation: updatedChat }
        ),
      });
      const { message } = await response.json();

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: message.content },
      ]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
    }
  };

  useEffect(() => {
    if (!leadId) {
      fetch("/api/cookies", { method: "GET" })
        .then(res => res.json())
        .then(data => {
          if (data.id) setLeadId(data.id);
        })
        .catch(error => console.error("Error getting data from cookies:", error));
    }
  }, [leadId]);

  useEffect(() => {
    if (leadId) {
      fetch("/api/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId }),
      })
      .catch(error => console.error("Error saving data in cookies:", error));
    }
  }, [leadId]);

  useEffect(() => {
    if (chatMessages.length < 2) return;

    const payloadChat: ChatMessage[] = [
      ...chatMessages,
      { role: "system", content: 'Complete the following JSON if the information exists...' },
    ];

    fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { conversation: payloadChat, response_format: "json_object" }
      ),
    })
    .then(res => res.json())
    .then(data => setExtractedInfo(JSON.parse(data.message.content)))
    .catch(error => console.error("Error extracting information from conversation:", error));
  }, [chatMessages, extractedInfo]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-900 text-white p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 flex space-x-2 z-50">
        <button
          onClick={() => handleLanguageChange("fr")}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            language === "fr" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          FR
        </button>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            language === "en" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          EN
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold">Jooby</h1>
        <div className="text-3xl font-semibold mt-4">{t.title}</div>
        <button onClick={handleOpenChat} className="mt-4 px-4 py-2 bg-green-600 rounded-md">
  {t.startChat}
</button>
      </div>
      {chatOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-80 z-50">
          <div className="relative w-full max-w-4xl bg-gray-700 p-6 rounded-lg shadow-xl">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              &times;
            </button>
            <div className="overflow-y-auto max-h-96 w-full space-y-4 mb-4 p-4 bg-gray-800 rounded-md">
              {chatMessages.map((msg, index) => (
                <p key={index} className="text-white">
                  <strong>{msg.role === "user" ? `${t.userIdentifier}:` : "Jooby:"}</strong> {msg.content}
                </p>
              ))}
            </div>
            <div className="flex w-full space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 rounded-md bg-gray-600 text-white border border-gray-500"
                placeholder={t.placeholder}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 p-2 rounded-md text-white hover:bg-green-500"
              >
                {t.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jooby;
