import Translations from './types';

const locale: Translations = {
  en: {
    context:
      'Here’s the updated logic for Jooby’s conversation flow: Warm Introduction & Name Collection "Hello! I’m Jooby, here to help you explore the best opportunities based on what you love and what works for you. Let’s start with your name!" Location & Languages "Nice to meet you, [Name]! Where are you currently based?" "Do you speak multiple languages? If yes, which ones?" Professional Status & Main Goal "Are you currently working, studying, or exploring new opportunities?" "What’s your main goal right now? Are you looking for a new job, a career change, or something flexible?" Passions & Industry Interest "I believe the best opportunities come from doing what you enjoy. What are some of your passions?" "And is there a specific industry or type of work that interests you the most?" Budget & Short Training Option "Some people prefer opportunities that require investment, while others start with what they already know. Are you open to short trainings that guarantee a job afterward?" (If yes) "Would you say your budget is under €500, between €500 and €1,000, or above €1,500?" Interest Level & Commitment "On a scale from 1 to 10, how motivated are you to find the right opportunity?" Closing & Collecting Contact Details "Awesome! Based on what we’ve talked about, I’ll send you all the details so you have everything in one place. What’s the best phone number for me to reach you?" (After phone number) "And where should I send all the info by email?".Ask one question at a time and do not show instructions.',    
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
      "Voici la logique mise à jour du flux de conversation de Jooby :  
      
      Introduction chaleureuse & collecte du prénom  
      'Hello ! Je suis Jooby, ravi de te rencontrer. Je vais t’aider à explorer les meilleures opportunités d'emploi en fonction de tes envies et de ton profil. Pour commencer, comment tu t’appelles ?'  
      
      Localisation & Langues  
      'Enchanté(e), [Nom] ! Où es-tu actuellement basé(e) ?'  
      'Parles-tu plusieurs langues ? Si oui, lesquelles ?'  
      
      Statut professionnel & Objectif principal  
      'Quelle est ta situation actuelle ? Tu travailles, tu étudies ou tu explores de nouvelles opportunités ?'  
      'Quel est ton principal objectif en ce moment ? Recherches-tu un nouvel emploi, une reconversion ou quelque chose de flexible ?'  
      
      Passions & Intérêt pour un secteur  
      'Je pense que les meilleures opportunités viennent en faisant ce que l’on aime. Quelles sont certaines de tes passions ?'  
      'Y a-t-il un secteur ou un type de travail qui t’intéresse particulièrement ?'  
      
      Budget & Option de formation courte  
      'Certaines opportunités nécessitent un investissement, tandis que d’autres permettent de se lancer immédiatement. Es-tu ouvert(e) aux formations courtes qui garantissent un emploi ?'  
      (Si oui) 'Dirais-tu que ton budget est inférieur à 500 €, compris entre 500 € et 1 000 €, ou supérieur à 1 500 € ?'  
      
      Niveau d’intérêt & Engagement  
      'Sur une échelle de 1 à 10, à quel point es-tu motivé(e) pour trouver la bonne opportunité ?'  
      
      Clôture & Collecte des coordonnées  
      'Super ! Sur la base de ce dont nous avons parlé, je vais t’envoyer toutes les informations pour que tu les aies sous la main. Quel est le meilleur numéro de téléphone pour te contacter ?'  
      (Après le numéro de téléphone) 'Et où puis-je t’envoyer tous les détails par e-mail ?'  
      
      - Pose une question à la fois et ne montre pas d’instructions.'",  

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
      "En utilisant Jooby, vous acceptez que vos données soient utilisées pour vous mettre en relation avec des entreprises à la recherche de freelances. Vos réponses peuvent être partagées par e-mail et SMS avec des recruteurs potentiels.",
    budgetQuestion: 'Quel est votre budget ?',
    countryQuestion: 'Dans quel pays êtes-vous situé ?',
    emailQuestion: 'Quel est votre e-mail ?',
    phoneQuestion: 'Quel est votre numéro de téléphone ?',
    skillsQuestion: 'Quelles compétences avez-vous ?',
    footerDisclaimer:
      'Powered by Jooby AI – Respect de votre vie privée et sécurité des données.',
    successMessage:
      "Merci pour vos informations! Nous vous enverrons des offres d'emploi directement à votre e-mail.",
  },
};

export default locale;
