import WordSelector from "./wordSelector";
import words from "../words/words.js";
import Word from "./word.js";

export default class Game {
  constructor(state = null) {
    this.list = [];
    this.loadWords();
    this.wordSelector = new WordSelector(this.list, state.wordsWeightList);
    this.score = state?.score || 0;
  }

  loadWords() {
    this.list = words.map((element) => new Word(element[0], element[1]));
  }

  getRandomWord() {
    if (this.list.length <= 0) {
      return null;
    }
    return this.wordSelector.getWord();
  }

  answer(actualWord, userWord) {
    const result =
      userWord.toLowerCase() === actualWord.translationWord.toLowerCase();

    if (result) {
      this.wordSelector.decreaseWordWeight(actualWord);
      this.score += 1;
    } else {
      this.wordSelector.increaseWordWeight(actualWord);
    }

    return result;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return {
      score: this.score,
      wordsWeightList: this.wordSelector.getWeightOfWordList(),
    };
  }

  skip(actualWord) {
    this.wordSelector.increaseWordWeight(actualWord);
  }
}
