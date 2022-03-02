import WordSelector from "./wordSelector";
import words from "../words/words";
import Word from "./word";

export default class Game {
  list: Word[];
  wordSelector: WordSelector;
  score: number;

  constructor(state = null, initialList?) {
    this.list = initialList || this.loadWords();
    this.wordSelector = new WordSelector(this.list, state?.wordsWeightList);
    this.score = state?.score || 0;
  }

  loadWords() {
    return words.map((element) => new Word(element[0], element[1]));

    // state has length of words list
    // if length is bigger so new words has an 1 weight
  }

  getRandomWord() {
    if (this.list.length === 0) {
      return null;
    }
    return this.wordSelector.getWord();
  }

  answer(actualWord, userWord) {
    const variationsOfUserAnswer = userWord.trim().toLowerCase().split(",");

    const result = actualWord.translations.some((word) => {
      return variationsOfUserAnswer.includes(word);
    });

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
      wordsWeightList: this.wordSelector.weightsOfWords,
    };
  }

  skip(actualWord) {
    this.wordSelector.increaseWordWeight(actualWord);
  }
}
