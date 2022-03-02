import Word from "./word";

export default class WordSelector {
  words: Word[]
  initialWeightsOfWords: number[];
  randomFn: () => number;


  constructor(words, initialWeightsOfWords = []) {
    this.words = words;
    this.initialWeightsOfWords = initialWeightsOfWords;
    this.randomFn = Math.random;
  }

  get weightsOfWords() {
    // return (this._weightsOfWords ||= initialWeightsOfWords
    //   ? initialWeightsOfWords
    //   : words.map(() => 1));

    const diff = this.words.length - this.initialWeightsOfWords.length;
    const deficit = (Math.abs(diff) + diff) / 2;
    const result = [
      ...this.initialWeightsOfWords.slice(0, this.words.length),
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
    const weightsSum = this.getWeightsOfWordsSum();

    const randomNum = this.randomFn() * weightsSum;

    let acc = 0;

    const foundIndex = this.weightsOfWords.findIndex((weight) => {
      acc += weight;
      if (randomNum < acc) {
        return true;
      }
    });

    return this.words[foundIndex];
  }

  increaseWordWeight(word) {
    const wordIndex = this.words.indexOf(word);
    this.weightsOfWords[wordIndex] += 1;
  }

  decreaseWordWeight(word) {
    const wordIndex = this.words.indexOf(word);
    if (this.weightsOfWords[wordIndex] > 1) {
      this.weightsOfWords[wordIndex] -= 1;
    }
  }
}
