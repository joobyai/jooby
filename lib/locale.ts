export interface TranslationContent {
  title: string;
  startChat: string;
  userIdentifier: string;
  placeholder: string;
  send: string;
}
import type { Translations, TranslationContent } from "./types";

const localeData: Translations = {
  en: {
    context:
      'Here’s the updated logic for Jooby’s conversation flow: Warm Introduction & Name Collection "Hello! I’m Jooby, here to help you explore the best opportunities based on what you love and what works for you. Let’s start with your name!" Location & Languages "Nice to meet you, [Name]! Where are you currently based?" "Do you speak multiple languages? If yes, which ones?" Professional Status & Main Goal "Are you currently working, studying, or exploring new opportunities?" "What’s your main goal right now? Are you looking for a new job, a career change, or something flexible?" Passions & Industry Interest "I believe the best opportunities come from doing what you enjoy. What are some of your passions?" "And is there a specific industry or type of work that interests you the most?" Budget & Short Training Option "Some people prefer opportunities that require investment, while others start with what they already know. Are you open to short trainings that guarantee a job afterward?" (If yes) "Would you say your budget is under €500, between €500 and €1,000, or above €1,500?" Interest Level & Commitment "On a scale from 1 to 10, how motivated are you to find the right opportunity?" Closing & Collecting Contact Details "Awesome! Based on what we’ve talked about, I’ll send you all the details so you have everything in one place. What’s the best phone number for me to reach you?" (After phone number) "And where should I send all the info by email?".Ask one question at a time and do not show instructions.',    
    typing: 'Jooby is typing...',
    userIdentifier: 'You',
    userChoice: 'You have chosen: ',
    title: 'The AI that finds you a job in 1 hour',
    startChat: "Start Chat",
    welcome: 'Welcome to Jooby!',
    question:
      'Would you like me to find you an online job or one near your location?',
    onlineJob: 'Find an online job',
    localJob: 'Find a job near me',
    placeholder: 'Enter your message...',
    send: 'Send',
    disclaimer:
      'By using Jooby, you agree that your data may be used to connect you with companies looking for freelancers. Your responses may be shared via email and SMS with potential recruiters.',
    budgetQuestion: 'What is your budget?',
    countryQuestion: 'Which country are you located in?',
    emailQuestion: 'What is your email?',
    phoneQuestion: 'What is your phone number?',
    skillsQuestion: 'What skills do you have?',
    nameQuestion: "To start, what’s your name?",
    sectorQuestion: "Thanks, {name}! Which industry or job position are you looking for?",
    jobTypeQuestion: "Do you prefer a remote or on-site job?",
    experienceQuestion: "Do you have any relevant experience or skills?",
    availabilityQuestion: "When would you be available to start working?",
    finalMessage: "Nous avons bien reçu tes informations. Nos partenaires vont t’envoyer les offres d’emploi par email et pourront aussi te contacter par téléphone ou SMS si tu le souhaites. Bonne chance dans ta recherche !",
    footerDisclaimer:
      'Powered by Jooby AI – Respect your privacy and data security.',
    successMessage:
      'Thank you for your information! We will send you job offers directly to your email.',
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
    disclaimer: "Toutes les informations seront utilisées uniquement pour t'envoyer des opportunités adaptées.",
    budgetQuestion: "Es-tu ouvert(e) à une formation courte avant d’obtenir un emploi ?",  
    countryQuestion: "Dans quel pays es-tu situé(e) ?",
    nameQuestion: "Pour commencer, comment t’appelles-tu ?",
    sectorQuestion: "Merci, {name} ! Dans quel domaine ou type de poste cherches-tu un emploi ?",
    jobTypeQuestion: "Tu préfères un emploi à distance ou en présentiel ?",
    experienceQuestion: "As-tu une expérience ou des compétences spécifiques que tu aimerais mettre en avant ?",
    availabilityQuestion: "Es-tu disponible immédiatement ou as-tu une date de début souhaitée ?",
    phoneQuestion: "Il y a actuellement plusieurs opportunités dans ce secteur. Pour t’envoyer les informations et offres adaptées, pourrais-tu me donner ton numéro de téléphone ?",
    skillsQuestion: "Quelles compétences as-tu ?",
    emailQuestion: "Merci ! Et enfin, sur quelle **adresse email** puis-je t’envoyer les détails des opportunités disponibles ?",
    finalMessage: "Nous avons bien reçu tes informations. Nos partenaires vont t’envoyer les offres d’emploi par email et pourront aussi te contacter par téléphone ou SMS si tu le souhaites. Bonne chance dans ta recherche !",
    footerDisclaimer:
      'Powered by Jooby AI – Respect de votre vie privée et sécurité des données.',
    successMessage:
      "Merci pour vos informations! Nous vous enverrons des offres d'emploi directement à votre e-mail.",
  },
};

export default localeData;
