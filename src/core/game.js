import WordSelector from "./wordSelector";
import words from "../words/words.js";
import Word from "./word.js";

export default class Game {
  constructor() {
    this.list = [];
    this.loadWords();
    this.wordSelector = new WordSelector(this.list);
  }

  loadWords() {
    for (let i in words) {
      this.list.push(new Word(i, words[i]));
    }
  }

  getRandomWord() {
    return this.wordSelector.getWord();
  }

  getWordsList() {
    return this.list;
  }
}
