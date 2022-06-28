import WordSelector from "./wordSelector";
import Word from "./word";
import Dictionary from "./dictionary";
import GameState from "./GameState";

export default class Game {
  wordSelector: WordSelector;
  state: GameState;
  dictionary: Dictionary;

  constructor(state: GameState, dictionary: Dictionary) {
    this.dictionary = dictionary;
    this.state = state;
    this.wordSelector = new WordSelector(state, dictionary);
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
      this.state.score += 1;
    } else {
      this.wordSelector.increaseWordWeight(actualWord);
    }

    return result;
  }

  getScore() {
    return this.state.score;
  }

  skip(actualWord: Word) {
    this.wordSelector.increaseWordWeight(actualWord);
  }
}
