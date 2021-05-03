export default class WordSelector {
  constructor(words, weightsOfWords) {
    this.words = words;
    this.weightsOfWords = weightsOfWords ? weightsOfWords : words.map(() => 1);
    this.randomFn = Math.random;
  }

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
