/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { translations } from "./locale";

const Jooby = () => {
  const [language, setLanguage] = useState<keyof typeof translations>("fr");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [jobType, setJobType] = useState<"online" | "local" | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("joobyChatData") || "{}");
    if (savedData) {
      setJobType(savedData.jobType || null);
      setBudget(savedData.budget || null);
      setCountry(savedData.country || null);
      setEmail(savedData.email || null);
      setChatMessages(savedData.chatMessages || []);
    }
    setTimeout(() => setLoading(false), 2000);
  }, []);

  /*
  useEffect(() => {
    const dataToSave = {
      jobType,
      budget,
      country,
      email,
      chatMessages,
    };
    localStorage.setItem("joobyChatData", JSON.stringify(dataToSave));
  }, [jobType, budget, country, email, chatMessages]);
  */
  const t = translations[language];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const startChat = (selectedJobType: "online" | "local") => {
    setJobType(selectedJobType);
    setChatOpen(true);
    setChatMessages([
      `${t.welcome}\n${t.question}`,
      `${t.userChoice} ${
        selectedJobType === "online" ? t.onlineJob : t.localJob
      }`,
      t.budgetQuestion,
    ]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, `${t.userIdentifier}: ${userInput}`];
    setChatMessages(newMessages);
    setUserInput("");
    setTyping(true);

    if (!budget) {
      // Validar se o orçamento é um número
      const parsedBudget = parseFloat(userInput);
      if (isNaN(parsedBudget)) {
        setChatMessages([...newMessages, "❌ Veuillez entrer un budget valide."]);
        setTyping(false);
        return;
      }
      setBudget(userInput);
      setChatMessages([...newMessages, t.countryQuestion]);
      setTyping(false);
      return;
    }

    if (!country) {
      // Validar se o país é uma string válida
      if (!/^[a-zA-Z\s]+$/.test(userInput)) {
        setChatMessages([...newMessages, "❌ Veuillez entrer un pays valide."]);
        setTyping(false);
        return;
      }
      setCountry(userInput);
      setChatMessages([...newMessages, t.emailQuestion]);
      setTyping(false);
      return;
    }

    if (!email) {
      // Validar se o e-mail é válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        setChatMessages([...newMessages, "❌ Veuillez entrer un e-mail valide."]);
        setTyping(false);
        return;
      }
      setEmail(userInput);
      setTyping(false);
      setChatMessages([
        ...newMessages,
        t.successMessage,
      ]);
      return;
    }

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userInput }),
      });
      const data = await response.json();
      setTyping(false);
      setChatMessages([
        ...newMessages,
        `Jooby: ${data.message || "Désolé, je n'ai pas compris."}`,
      ]);
    } catch (error: unknown) {
      console.error("Erreur OpenAI:", error);
      setTyping(false);
      const errorMessage =
        error instanceof Error ? error.message : "Erreur inconnue";
      setChatMessages([...newMessages, `❌ Erreur serveur: ${errorMessage}`]);
    }
  };

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
        <p>
          Powered by OpenAI GPT-4 – Respect de votre vie privée et sécurité des
          données.
        </p>
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
                  {msg}
                </p>
              ))}
              {typing && (
                <p className="text-gray-400">Jooby est en train d'écrire...</p>
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
