import words from "../words/words";

export default class Dictionary {
  store: Storage;

  constructor(store = window.localStorage) {
    this.store = store;
    console.log(store);
  }

  getAllWords() {
    const allWorlds = words.reduce((acc, cur) => {
      return {...acc, [cur[0]]: {translations: [cur[1]]}}
    }, {});

    return allWorlds;
  }


  /** This method returns an unknown words (words that weight is more than 1). */
  /** Weight if the words we get from the gameState. */
  getUnknownWords() {
    const gameState = this.store.getItem("gameState");
    if (gameState === null) {
      return words;
    }
    
    const wordsScore = JSON.parse(gameState).wordsWeightList;

    const allWords = new Map();
    words.forEach((item, index) => {
      allWords.set(item[0], {translations: item[1], weight: wordsScore[index]})
    });

    const unknownWords = words.reduce((acc, cur, index) => {
      if (wordsScore[index] > 1) {
        return {...acc, [cur[0]]: {translations: cur[1]}}
      }
      return acc;
    }, {})

    return unknownWords;
    
  }
}