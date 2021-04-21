export default class WordSelector {
  constructor(words, weightOfWordList) {
    this.words = words;
    this.weightOfWordList = weightOfWordList
      ? weightOfWordList
      : words.map(() => 1);
  }

  getWord() {
    const randomItemFromListArray = this.words[
      Math.floor(Math.random() * this.words.length)
    ];
    return randomItemFromListArray;
  }

  increaseWordWeight(word) {
    const wordIndex = this.words.indexOf(word);
    this.weightOfWordList[wordIndex] += 1;
  }

  decreaseWordWeight(word) {
    const wordIndex = this.words.indexOf(word);
    if (this.weightOfWordList[wordIndex] > 1) {
      this.weightOfWordList[wordIndex] -= 1;
    }
  }

  getWeightOfWordList() {
    return this.weightOfWordList;
  }
}
