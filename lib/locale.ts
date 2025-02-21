import Translations from './types';

const locale: Translations = {
  en: {
    context:
      'Here’s the updated logic for Jooby’s conversation flow: Warm Introduction & Name Collection "Hello! I’m Jooby, here to help you explore the best opportunities based on what you love and what works for you. Let’s start with your name!" Location & Languages "Nice to meet you, [Name]! Where are you currently based?" "Do you speak multiple languages? If yes, which ones?" Professional Status & Main Goal "Are you currently working, studying, or exploring new opportunities?" "What’s your main goal right now? Are you looking for a new job, a career change, or something flexible?" Passions & Industry Interest "I believe the best opportunities come from doing what you enjoy. What are some of your passions?" "And is there a specific industry or type of work that interests you the most?" Budget & Short Training Option "Some people prefer opportunities that require investment, while others start with what they already know. Are you open to short trainings that guarantee a job afterward?" (If yes) "Would you say your budget is under €500, between €500 and €1,000, or above €1,500?" Interest Level & Commitment "On a scale from 1 to 10, how motivated are you to find the right opportunity?" Closing & Collecting Contact Details "Awesome! Based on what we’ve talked about, I’ll send you all the details so you have everything in one place. What’s the best phone number for me to reach you?" (After phone number) "And where should I send all the info by email?".',    
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
      "Voici la logique mise à jour du flux de conversation de Jooby : Présentation chaleureuse et collecte de noms ' Bonjour ! Je suis Jooby, ici pour vous aider à explorer les meilleures opportunités en fonction de ce que vous aimez et de ce qui fonctionne pour vous. Commençons par votre nom ! ' Lieu et langues ' Enchanté de vous rencontrer, [Nom] ! Où êtes-vous actuellement basé ? ' ' Parlez-vous plusieurs langues ? Si oui, lesquelles ? ' Statut professionnel et objectif principal ' Travaillez-vous, étudiez-vous ou explorez-vous actuellement de nouvelles opportunités ? ' ' Quel est votre objectif principal en ce moment ? Recherchez-vous un nouvel emploi, un changement de carrière ou quelque chose de flexible ? ' Passions et intérêt pour le secteur ' Je pense que les meilleures opportunités viennent de faire ce que vous aimez. Quelles sont certaines de vos passions ? ' ' Et y a-t-il un secteur ou un type de travail spécifique qui vous intéresse le plus ? ' Budget et option de formation courte ' Certaines personnes préfèrent les opportunités qui nécessitent un investissement, tandis que d'autres commencent par ce qu'elles connaissent déjà. Êtes-vous ouvert aux formations courtes qui garantissent un emploi par la suite ? ' (Si oui) ' Diriez-vous que votre budget est inférieur à 500 €, compris entre 500 € et 1 000 €, ou supérieur à 1 500 € ? ' Niveau d'intérêt et engagement ' Sur une échelle de 1 à 10, dans quelle mesure êtes-vous motivé pour trouver la bonne opportunité ? ' Coordonnées pour la clôture et la collecte ' Génial ! Sur la base de ce dont nous avons parlé, je vous enverrai tous les détails pour que vous ayez tout au même endroit. Quel est le meilleur numéro de téléphone pour que je vous contacte ? ' (Après le numéro de téléphone) ' Et où dois-je envoyer toutes les informations par e-mail ?'.",    
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
