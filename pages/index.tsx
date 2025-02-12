/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from "react";

// Définir les types pour les traductions
interface Translations {
  en: {
    title: string;
    welcome: string;
    question: string;
    onlineJob: string;
    localJob: string;
    placeholder: string;
    send: string;
    disclaimer: string;
  };
  fr: {
    title: string;
    welcome: string;
    question: string;
    onlineJob: string;
    localJob: string;
    placeholder: string;
    send: string;
    disclaimer: string;
  };
}

const translations: Translations = {
  en: {
    title: "The AI that finds you a job in 1 hour",
    welcome: "Welcome to Jooby!",
    question:
      "Would you like me to find you an online job or one near your location?",
    onlineJob: "Find an online job",
    localJob: "Find a job near me",
    placeholder: "Enter your message...",
    send: "Send",
    disclaimer:
      "By using Jooby, you agree that your data may be used to connect you with companies looking for freelancers. Your responses may be shared via email and SMS with potential recruiters.",
  },
  fr: {
    title: "L'IA qui te trouve un job en 1H", // Pas d'échappement HTML pour l'apostrophe
    welcome: "Bienvenue sur Jooby !",
    question:
      "Souhaites-tu que je te trouve un emploi en ligne ou près de chez toi ?",
    onlineJob: "Trouver un job en ligne",
    localJob: "Trouver un job près de chez moi",
    placeholder: "Entrez votre message...",
    send: "Envoyer",
    disclaimer:
      "En utilisant Jooby, vous acceptez que vos données puissent être utilisées pour vous connecter avec des entreprises à la recherche de freelances. Vos réponses pourront être partagées via email et SMS avec des recruteurs potentiels.",
  },
};

const Jooby = () => {
  const [language, setLanguage] = useState<keyof typeof translations>("fr");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const t = translations[language];

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

  const startChat = (jobType: "online" | "local") => {
    setChatOpen(true);
    setChatMessages([
      `${t.welcome}\n${t.question}`,
      `Tu as choisi: ${jobType === "online" ? t.onlineJob : t.localJob}`,
    ]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, `Vous: ${userInput}`];
    setChatMessages(newMessages);
    setUserInput("");
    setTyping(true);

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

      // Vérification si `error` est une instance d'Error
      const errorMessage =
        error instanceof Error ? error.message : "Erreur inconnue";
      setChatMessages([...newMessages, `❌ Erreur serveur: ${errorMessage}`]);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin text-5xl font-bold">∞</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-900 text-white p-4 relative">
      <div className="absolute top-4 right-4 flex space-x-2">
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
      <div className="text-center pt-10">
        <div className="text-5xl font-bold">∞</div>
        <h1 className="text-2xl font-bold">Jooby</h1>
      </div>
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto mt-[5rem]">
        <div className="text-3xl font-semibold">{t.title}</div>
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
      <div className="absolute bottom-0 w-full text-center text-xs text-gray-400 py-4">
        <p>
          Powered by OpenAI GPT-4 – Respect de votre vie privée et sécurité des
          données.
        </p>
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
