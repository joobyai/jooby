import type { Translations } from "./types";

const localeData: Translations = {
  en: {
    context: 
      "Here’s the updated logic for Jooby’s conversation flow: Warm Introduction & Name Collection..." + 
      "Ask one question at a time and do not show instructions.",
    typing: "Jooby is typing...",
    userIdentifier: "You",
    userChoice: "You have chosen: ",
    title: "The AI that finds you a job in 1 hour",
    startChat: "Start Chat",
    welcome: "Welcome to Jooby!",
    question: "Would you like me to find you an online job or one near your location?",
    onlineJob: "Find an online job",
    localJob: "Find a job near me",
    placeholder: "Enter your message...",
    send: "Send",
    disclaimer: 
      "By using Jooby, you agree that your data may be used to connect you with companies looking for freelancers...",
    budgetQuestion: "What is your budget?",
    countryQuestion: "Which country are you located in?",
    emailQuestion: "What is your email?",
    phoneQuestion: "What is your phone number?",
    skillsQuestion: "What skills do you have?",
    nameQuestion: "To start, what’s your name?",
    sectorQuestion: "Thanks, {name}! Which industry or job position are you looking for?",
    jobTypeQuestion: "Do you prefer a remote or on-site job?",
    experienceQuestion: "Do you have any relevant experience or skills?",
    availabilityQuestion: "When would you be available to start working?",
    finalMessage: 
      "We have received your information. Our partners will send you job offers via email and may also contact you by phone or SMS if you wish. Good luck in your search!",
    footerDisclaimer: "Powered by Jooby AI – Respect your privacy and data security.",
    successMessage: "Thank you for your information! We will send you job offers directly to your email.",
  },
  fr: {
    context: 
      "Je suis Jooby, ton assistant personnel pour trouver des opportunités d’emploi adaptées à ton profil.",
    typing: "Jooby est en train d'écrire...",
    userIdentifier: "Vous",
    userChoice: "Vous avez choisi :",
    title: "L'IA qui te trouve un job en 1H",
    startChat: "Démarrer la discussion",
    welcome: "Bonjour ! Je suis Jooby, ton assistant pour trouver les meilleures opportunités d'emploi.",
    question: "Peux-tu me donner plus de détails ?",
    onlineJob: "Tu recherches un emploi en ligne ?",
    localJob: "Ou un emploi en présentiel ?",
    placeholder: "Écris ta réponse ici...",
    send: "Envoyer",
    disclaimer: 
      "Toutes les informations seront utilisées uniquement pour t'envoyer des opportunités adaptées.",
    budgetQuestion: "Es-tu ouvert(e) à une formation courte avant d’obtenir un emploi ?",  
    countryQuestion: "Dans quel pays es-tu situé(e) ?",
    nameQuestion: "Pour commencer, comment t’appelles-tu ?",
    sectorQuestion: "Merci, {name} ! Dans quel domaine ou type de poste cherches-tu un emploi ?",
    jobTypeQuestion: "Tu préfères un emploi à distance ou en présentiel ?",
    experienceQuestion: "As-tu une expérience ou des compétences spécifiques que tu aimerais mettre en avant ?",
    availabilityQuestion: "Es-tu disponible immédiatement ou as-tu une date de début souhaitée ?",
    phoneQuestion: 
      "Il y a actuellement plusieurs opportunités dans ce secteur. Pour t’envoyer les informations et offres adaptées, pourrais-tu me donner ton numéro de téléphone ?",
    skillsQuestion: "Quelles compétences as-tu ?",
    emailQuestion: 
      "Merci ! Et enfin, sur quelle **adresse email** puis-je t’envoyer les détails des opportunités disponibles ?",
    finalMessage: 
      "Nous avons bien reçu tes informations. Nos partenaires vont t’envoyer les offres d’emploi par email et pourront aussi te contacter par téléphone ou SMS si tu le souhaites. Bonne chance dans ta recherche !",
    footerDisclaimer: "Powered by Jooby AI – Respect de votre vie privée et sécurité des données.",
    successMessage: 
      "Merci pour vos informations! Nous vous enverrons des offres d'emploi directement à votre e-mail.",
  },
};

export default localeData;
