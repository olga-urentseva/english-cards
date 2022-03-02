export default class Word {
  originalWord: string;
  translations: string[];  

  constructor(originalWord: string, translations: string[]) {
    this.originalWord = originalWord;
    this.translations = translations;
  }
}
