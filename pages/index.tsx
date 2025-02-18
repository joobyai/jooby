import React, { useState, useEffect } from "react";
import Translations from "../lib/locale";
import locale from "../lib/locale";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const Jooby = () => {
  const [language, setLanguage] = useState<keyof typeof Translations>("en");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  const [jobType, setJobType] = useState<"online" | "local" | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [budget, setBudget] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [country, setCountry] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skills, setSkills] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canSaveToDb, setCanSaveToDb] = useState(false);

  const [isContextSet, setIsContextSet] = useState(false);

  const t = locale[language as keyof typeof Translations];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const setChatContext = async () => {
    const chatContext =[{
      role: "system",
      content: "You are a conversational assistant gathering information for job openings. During the conversation, you must only ask questions to collect the following data: name, email, country, professional status, main goal, passions, budget, skills, and industry. The user is only allowed to provide answers to your questions. If the user asks any other question or makes any comment that is not a direct answer, you must ignore it and simply remind the user to answer your question. Do not provide any information or answer any questions that are not directly related to collecting the required data. Begin by introducing the process and asking the first question."
    }];
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: chatContext }),
      });
      const { message } = await response.json();

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: message.content },
      ]);
      setIsContextSet(true);
      setLoading(false);
    } catch (error) {
      console.error("Error setting chat context:", error);
      setIsContextSet(false);
      setLoading(false);
    }
  };

  const startChat = (selectedJobType: "online" | "local") => {
    setJobType(selectedJobType);
    setChatOpen(true);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // include in the end of the userInput message a context to avoid assistant to answer questions
    const contextedUserInput = `Check if the following answers the previous question: ${userInput}. If not, please ask again. If it does, please proceed to the next question.`

    const payloadChat: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: contextedUserInput },
    ];

    const updatedChat: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: userInput },
    ];

    setChatMessages(updatedChat);
    setUserInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { conversation: payloadChat }
        ),
      });
      const { message } = await response.json();

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: message.content },
      ]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Não foi possível obter resposta do assistente.",
        },
      ]);
    }
    setTyping(false);
  };

  const saveToDb = async () => {
    console.log("Saving to DB...");
    try {
      const response = await fetch("/api/savedb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Math.random().toString(36),
          jobType,
          localization: country,
          budget,
          email,
          skills,
        }),
      });
      const data = await response.json();
      console.log("Data saved:", data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const sendToWebhook = async () => {
    try {
      const response = await fetch("/api/ghl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobType,
          localization: country,
          budget,
          email,
          skills,
        }),
      });
      const data = await response.json();
      console.log("Data sent to webhook:", data);
    } catch (error) {
      console.error("Error sending data to webhook:", error);
    }
  };

  useEffect(() => {
    console.log("isContextSet:", isContextSet);
    if (!isContextSet) {
      setChatContext();
    } else {
      setLoading(false);
    }
  }, [isContextSet]);

  useEffect(() => {
    if (canSaveToDb) {
      const handleSaveAndWebhook = async () => {
        try {
          await saveToDb();
          console.log("Data saved to DB, sending to webhook...");
          sendToWebhook();
        } catch (error) {
          console.error("Error during saveToDb or sendToWebhook:", error);
        }
      };
      handleSaveAndWebhook();
    }
  }, [canSaveToDb]);

  if (loading || !isContextSet) {
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="text-5xl font-bold">∞</div>
        <h1 className="text-2xl font-bold">Jooby</h1>
        <div className="text-3xl font-semibold mt-4">{t.title}</div>
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl mt-6">
          <p className="text-gray-300">{t.question}</p>
          <button
            onClick={() => startChat("online")}
            className="w-full rounded-md bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-500 mt-4"
          >
            {t.onlineJob}
          </button>
          <button
            onClick={() => startChat("local")}
            className="w-full rounded-md bg-[#1e4f8f] py-2 text-sm font-light text-white hover:bg-[#17437a] mt-2"
          >
            {t.localJob}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-6">{t.disclaimer}</p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-4">
        <p>{t.footerDisclaimer}</p>
      </div>

      {/* Chat Window */}
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
                  <strong>
                    {msg.role === "user" ? `${t.userIdentifier}:` : "Assistant:"}
                  </strong>{" "}
                  {msg.content}
                </p>
              ))}
              {typing && (
                <p className="text-gray-400">Assistant is typing...</p>
              )}
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
