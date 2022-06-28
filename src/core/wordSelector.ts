import Dictionary from "./dictionary";
import Word from "./word";
import GameState from "./GameState";

export default class WordSelector {
  dictionary: Dictionary;
  randomFn: () => number;
  gameState: GameState;

  constructor(gameState: GameState, dictionary: Dictionary) {
    this.gameState = gameState;
    this.dictionary = dictionary;
    this.randomFn = Math.random;
  }

  getWeightsOfWordsSum() {
    return this.gameState.wordsWeightList.reduce((prev, cur) => {
      return cur + prev;
    }, 0);
  }

  getWord() {
    const allWords = this.dictionary.getAllWords();

    if (allWords.length === 0) {
      return null;
    }

    const weightsSum = this.getWeightsOfWordsSum();

    const randomNum = this.randomFn() * weightsSum;

    let acc = 0;

    const foundIndex = this.gameState.wordsWeightList.findIndex((weight) => {
      acc += weight;
      if (randomNum < acc) {
        return true;
      }
    });

    return allWords[foundIndex];
  }

  increaseWordWeight(word: Word) {
    const wordIndex = this.dictionary.getAllWords().indexOf(word);
    this.gameState.wordsWeightList[wordIndex] += 1;
  }

  decreaseWordWeight(word: Word) {
    const wordIndex = this.dictionary.getAllWords().indexOf(word);
    if (this.gameState.wordsWeightList[wordIndex] > 1) {
      this.gameState.wordsWeightList[wordIndex] -= 1;
    }
  }
}
