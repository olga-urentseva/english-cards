import Dictionary from "./dictionary";
import Word from "./word";

export default class WordSelector {
  dictionary: Dictionary;
  initialWeightsOfWords: number[];
  randomFn: () => number;

  constructor(
    dictionary: Dictionary,
    initialWeightsOfWords: number[] | [] = []
  ) {
    this.dictionary = dictionary;
    this.initialWeightsOfWords = initialWeightsOfWords;
    this.randomFn = Math.random;
  }

  get weightsOfWords() {
    const allWords = this.dictionary.getAllWords();

    const diff = allWords.length - this.initialWeightsOfWords.length;
    const deficit = (Math.abs(diff) + diff) / 2;
    const result = [
      ...this.initialWeightsOfWords.slice(0, allWords.length),
      ...Array(deficit).fill(1),
    ];

    Object.defineProperty(this, "weightsOfWords", {
      value: result,
      writable: false,
      configurable: false,
      enumerable: false,
    });

    return result;
  }

  // check the length of the words weight list in the state

  getWeightsOfWordsSum() {
    return this.weightsOfWords.reduce((prev, cur) => {
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

    const foundIndex = this.weightsOfWords.findIndex((weight) => {
      acc += weight;
      if (randomNum < acc) {
        return true;
      }
    });

    return allWords[foundIndex];
  }

  increaseWordWeight(word: Word) {
    const wordIndex = this.dictionary.getAllWords().indexOf(word);
    console.log(wordIndex);
    this.weightsOfWords[wordIndex] += 1;
    console.log(wordIndex);
  }

  decreaseWordWeight(word: Word) {
    const wordIndex = this.dictionary.getAllWords().indexOf(word);
    if (this.weightsOfWords[wordIndex] > 1) {
      this.weightsOfWords[wordIndex] -= 1;
    }
  }
}
