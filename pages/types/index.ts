interface TranslationContent {
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
}

export interface Translations {
  en: TranslationContent;
  fr: TranslationContent;
}