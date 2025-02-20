interface TranslationContent {
  context: string;
  typing: string;
  userIdentifier: string;
  userChoice: string;
  title: string;
  welcome: string;
  question: string;
  onlineJob: string;
  localJob: string;
  placeholder: string;
  send: string;
  disclaimer: string;
  budgetQuestion: string;
  countryQuestion: string;
  emailQuestion: string;
  skillsQuestion: string;
  footerDisclaimer: string;
  successMessage: string;
}

interface Translations {
  en: TranslationContent;
  fr: TranslationContent;
}

export default Translations;