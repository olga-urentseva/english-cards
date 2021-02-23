import { Word } from "./word";

export default class WordSelector {
  constructor(words) {
    this.words = words;
  }
  getWordsList() {
    let list = [];
    for (let i in this.words) {
      list.push({
        originalWord: i,
        translationWord: this.words[i],
        wordValue: 1,
      });
    }
    return list;
  }

  getWord() {
    const wordsList = this.getWordsList();
    const randomItemFromListArray =
      wordsList[Math.floor(Math.random() * wordsList.length)];
    return randomItemFromListArray;
    // [
    // {originalWord: 'Apple', translationWord: 'Яблоко', wordValue: 1},
    // {originalWord: 'Apple', translationWord: 'Яблоко', wordValue: 1},
    // {originalWord: 'Apple', translationWord: 'Яблоко', wordValue: 1}
    // ]
  }
}
