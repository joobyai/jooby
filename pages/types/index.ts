interface TranslationContent {
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
  footerDisclaimer: string;
  successMessage: string;
}

export interface Translations {
  en: TranslationContent;
  fr: TranslationContent;
}