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
  phoneQuestion: string;
  skillsQuestion: string;
  footerDisclaimer: string;
  successMessage: string;
  nameQuestion: string;
  sectorQuestion: string;
  jobTypeQuestion: string;
  experienceQuestion: string;
  availabilityQuestion: string;
  finalMessage: string;
  startChat: string;
}


interface Translations {
  en: TranslationContent;
  fr: TranslationContent;
}

export interface Translations {
  en: TranslationContent;
  fr: TranslationContent;
}
