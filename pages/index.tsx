import React, { useState, useEffect } from "react";

const translations = {
  en: {
    title: "The AI that finds you a job in 1 hour",
    welcome: "Welcome to Jooby!",
    question: "Would you like me to find you an online job or one near your location?",
    onlineJob: "Find an online job",
    localJob: "Find a job near me",
    placeholder: "Enter your message...",
    send: "Send",
    disclaimer:
      "By using Jooby, you agree that your data may be used to connect you with companies looking for freelancers. Your responses may be shared via email and SMS with potential recruiters.",
  },
  fr: {
    title: "L&apos;IA qui te trouve un job en 1H",
    welcome: "Bienvenue sur Jooby !",
    question: "Souhaites-tu que je te trouve un emploi en ligne ou près de chez toi ?",
    onlineJob: "Trouver un job en ligne",
    localJob: "Trouver un job près de chez moi",
    placeholder: "Entrez votre message...",
    send: "Envoyer",
    disclaimer:
      "En utilisant Jooby, vous acceptez que vos données puissent être utilisées pour vous connecter avec des entreprises à la recherche de freelances. Vos réponses pourront être partagées via email et SMS avec des recruteurs potentiels.",
  },
};

const Jooby = () => {
 const [language, setLanguage] = useState<"en" | "fr">("fr");
  const [chatStarted, setChatStarted] = useState(false);
 const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const t = translations[language];

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const startChat = () => {
    setChatStarted(true);
    setChatMessages(["Bonjour! Je suis Jooby. Quel est ton prénom? 😊"]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, `Vous: ${userInput}`];
    setChatMessages(newMessages);
    setUserInput("");
    setTyping(true);

    // Appel à l'API route que nous avons créée précédemment
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage: userInput }),
    });

    const data = await response.json();
    setTyping(false);
    setChatMessages([...newMessages, `Jooby: ${data.message}`]);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-5xl font-bold">∞</div>
          <p className="mt-2">Jooby se charge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <button
          onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          className="flex items-center space-x-2 p-2 bg-gray-700 rounded-md text-white hover:bg-gray-600"
        >
          <span>{language === "fr" ? "🇬🇧" : "🇫🇷"}</span>
          <span>{language === "fr" ? "English" : "Français"}</span>
        </button>
      </div>
      <div className="text-5xl font-bold">∞</div>
      <h1 className="mb-2 text-2xl font-bold text-white">Jooby</h1>
      <h2 className="mb-4 text-xl font-semibold text-white">{t.welcome}</h2>
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl text-center">
        {!chatStarted ? (
          <>
            <p className="mb-3 text-gray-300" style={{ fontSize: "17px", lineHeight: "25px" }}>
              {t.question}
            </p>
            <div className="space-y-4">
              <button
                onClick={startChat}
                className="w-full rounded-md bg-green-600 py-3 font-semibold text-white hover:bg-green-500 text-lg"
              >
                {t.onlineJob}
              </button>
              <button
                onClick={startChat}
                className="w-full rounded-md bg-[#1e4f8f] py-2 font-semibold text-white hover:bg-[#17437a]"
              >
                {t.localJob}
              </button>
            </div>
          </>
        ) : (
          <div className="h-64 overflow-y-auto bg-gray-700 p-4 rounded-md text-left">
            {chatMessages.map((msg, index) => (
              <p key={index} className="text-white mb-2">
                {msg}
              </p>
            ))}
            {typing && <p className="text-gray-400">Jooby est en train d&apos;écrire...</p>}
          </div>
        )}
      </div>
      {chatStarted && (
        <div className="mt-4 flex w-full max-w-md space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600"
            placeholder={t.placeholder}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-600 p-2 rounded-md text-white hover:bg-green-500"
          >
            {t.send}
          </button>
        </div>
      )}
      <p className="mt-4 text-xs text-gray-400 max-w-md text-center">
        {t.disclaimer}
      </p>
    </div>
  );
};

export default Jooby;
