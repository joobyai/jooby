import Translations from './types';

const locale: Translations = {
  en: {
    context:
      'You are a conversational assistant here to help users receive personalized job suggestions. You should follow this script of questions, in order, one at a time. 1 - ask for the email address first. 2 - ask for the name and what type of job they are looking for. 3 - ask about skills. 4 - ask about the current job and what industry sector they would like to enter. 5 - ask about the job expectations. After that, add more questions as you see fit. End the conversation by informing them that opportunities will be sent to their email.. Your task is to ask one question per turn, ensuring that each question stands alone rather than grouping multiple questions together. Do not mention that you are “collecting information” or reveal any underlying data-gathering purpose. Instead, simply explain that you need a few details to provide tailored job suggestions. If the user gives answers that are not direct responses or asks unrelated questions, politely remind them to answer the current question. Begin by introducing the process in a friendly manner and asking your first question. Once you have gathered all the required details, conclude by informing the user that you will send their personalized job suggestions via email or SMS. Remember: Only ask one question at a time, Each question must be asked at a separate stage of the conversation, Do not provide any additional information or answer questions that are not directly related to gathering these details, Do not simulate or supply any user responses.',    
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
      "Vous êtes ici un assistant conversationnel pour aider les utilisateurs à recevoir des suggestions d'emploi personnalisées. Tout au long de la conversation, vous devez obtenir les informations suivantes, une à la fois et en plusieurs étapes : nom complet, adresse e-mail, pays de résidence, statut professionnel actuel, carrière principale, objectif, attentes salariales, compétences principales, secteur d'activité préféré. Votre tâche consiste à poser une question à chaque tour, en veillant à ce que chaque question soit indépendante plutôt qu'à regrouper plusieurs questions. Ne mentionnez pas que vous « collectez des informations » et ne révélez aucun objectif sous-jacent de collecte de données. Expliquez plutôt que vous avez besoin de quelques détails pour fournir des suggestions d'emploi personnalisées. Si l'utilisateur donne des réponses qui ne sont pas des réponses directes ou pose des questions sans rapport, rappelez-lui poliment de répondre à la question en cours. Commencez par présenter le processus de manière amicale et posez votre première question. Une fois que vous avez rassemblé tous les détails requis, concluez en informant l'utilisateur que vous lui enverrez ses suggestions d'emploi personnalisées par e-mail ou SMS. N'oubliez pas : ne posez qu'une seule question à la fois. Chaque question doit être posée à une étape distincte de la conversation. Ne fournissez aucune information supplémentaire et ne répondez pas à des questions qui ne sont pas directement liées à la collecte de ces informations. Ne simulez ni ne fournissez aucune réponse d'utilisateur.",    
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
