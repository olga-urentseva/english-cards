import words from "../words/words";
import Word from "./word";

export default class Dictionary {
  store: Storage;

  constructor(store = window.localStorage) {
    this.store = store;
  }

  getAllWords() {
    return words.map((word) => {
      return new Word(word[0], word[1]);
    });
  }

  /** This method returns an unknown words (words that weight is more than 1). */
  /** Weight if the words we get from the gameState. */
  getUnknownWords() {
    const gameState = this.store.getItem("gameState");
    if (gameState === null) {
      return this.getAllWords();
    }

    const wordsScore = JSON.parse(gameState).wordsWeightList;

    const unknownWords = words.filter((word, index) => {
      if (wordsScore[index] > 1) {
        return new Word(word[0], word[1]);
      }
      return;
    });

    return unknownWords;
  }

  searchWord(inputValue: string) {
    const allWords = this.getAllWords();
    return allWords.filter(
      (word) =>
        word.originalWord.includes(inputValue.toLocaleLowerCase()) ||
        word.translations.some((translation) =>
          translation.includes(inputValue.toLocaleLowerCase())
        )
    );
  }
}
