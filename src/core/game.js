import WordSelector from "./wordSelector";
import words from "../words/words.js";
import Word from "./word.js";

export default class Game {
  constructor() {
    this.list = [];
    this.loadWords();
    this.wordSelector = new WordSelector(this.list);
    this.score = 0;
  }

  loadWords() {
    for (let i in words) {
      this.list.push(new Word(i, words[i]));
    }
  }

  getRandomWord() {
    return this.wordSelector.getWord();
  }

  answer(actualWord, userWord) {
    const result =
      userWord.toLowerCase() === actualWord.translationWord.toLowerCase();

    if (result) {
      this.score += 1;
    }

    return result;
  }

  getScore() {
    return this.score;
  }
}
