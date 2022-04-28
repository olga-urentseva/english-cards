import WordSelector from "./wordSelector";
import Word from "./word";
import Dictionary from "./dictionary";

type State = {
  wordsWeightList: number[];
  score: number;
};

export default class Game {
  wordSelector: WordSelector;
  score: number;

  constructor(
    state: { wordsWeightList: number[]; score: number } | null = null,
    dictionary: Dictionary = new Dictionary()
  ) {
    this.wordSelector = new WordSelector(dictionary, state?.wordsWeightList);
    this.score = state?.score || 0;
  }

  getRandomWord() {
    return this.wordSelector.getWord();
  }

  answer(actualWord: Word, userWord: string) {
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

  skip(actualWord: Word) {
    this.wordSelector.increaseWordWeight(actualWord);
  }
}
