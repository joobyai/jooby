import Translations from './types';

const locale: Translations = {
  en: {
    context:
      'You are a conversational assistant gathering information for job openings. During the conversation, you must only ask questions to collect the following data: name, email, country, professional status, main goal, passions, budget, skills, and industry. The user is only allowed to provide answers to your questions. If the user asks any other question or makes any comment that is not a direct answer, you must ignore it and simply remind the user to answer your question. Do not provide any information or answer any questions that are not directly related to collecting the required data. Begin by introducing the process and asking the first question.',
    typing: 'Jooby is typing...',
    userIdentifier: 'You',
    userChoice: 'You have chosen: ',
    title: 'The AI that finds you a job in 1 hour',
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
    skillsQuestion: 'What skills do you have?',
    footerDisclaimer:
      'Powered by OpenAI GPT-4 – Respect your privacy and data security.',
    successMessage:
      'Thank you for your information! We will send you job offers directly to your email.',
  },
  fr: {
    context:
      "Vous êtes un assistant conversationnel qui collecte des informations pour des offres d'emploi. Au cours de la conversation, vous ne devez poser des questions que pour collecter les données suivantes : nom, email, pays, statut professionnel, objectif principal, passions, budget, compétences et secteur d'activité. L'utilisateur n'est autorisé à fournir des réponses qu'à vos questions. Si l'utilisateur pose une autre question ou fait un commentaire qui n'est pas une réponse directe, vous devez l'ignorer et simplement rappeler à l'utilisateur de répondre à votre question. Ne fournissez aucune information et ne répondez à aucune question qui n'est pas directement liée à la collecte des données requises. Commencez par présenter le processus et posez la première question.",
    typing: 'Jooby est en train de taper...',
    userIdentifier: 'Vous',
    userChoice: 'Vous avez choisi:',
    title: "L'IA qui te trouve un job en 1H",
    welcome: 'Bienvenue sur Jooby !',
    question:
      'Souhaites-tu que je te trouve un emploi en ligne ou près de chez toi ?',
    onlineJob: 'Trouver un job en ligne',
    localJob: 'Trouver un job près de chez moi',
    placeholder: 'Entrez votre message...',
    send: 'Envoyer',
    disclaimer:
      'En utilisant Jooby, vous acceptez que vos données puissent être utilisées pour vous connecter avec des entreprises à la recherche de freelances. Vos réponses pourront être partagées via email et SMS avec des recruteurs potentiels.',
    budgetQuestion: 'Quel est votre budget?',
    countryQuestion: 'Dans quel pays êtes-vous situé?',
    emailQuestion: 'Quel est votre e-mail?',
    skillsQuestion: 'Quelles compétences avez-vous?',
    footerDisclaimer:
      'Powered by OpenAI GPT-4 – Respect de votre vie privée et sécurité des données.',
    successMessage:
      "Merci pour vos informations! Nous vous enverrons des offres d'emploi directement à votre e-mail.",
  },
};

export default locale;
