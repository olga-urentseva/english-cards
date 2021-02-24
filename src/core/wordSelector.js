export default class WordSelector {
  constructor(words) {
    this.words = words;
  }

  getWord() {
    const randomItemFromListArray = this.words[
      Math.floor(Math.random() * this.words.length)
    ];
    return randomItemFromListArray;
  }
}
