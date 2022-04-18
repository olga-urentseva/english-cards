import { boolean } from "yup";
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
  getUnknownWords(): Word[] {
    const gameState = this.store.getItem("gameState");
    const allWords = this.getAllWords();
    if (gameState === null) {
      return allWords;
    }

    const wordsScore = JSON.parse(gameState).wordsWeightList;

    return allWords.filter((word, index) => {
      if (wordsScore[index] > 1) {
        return new Word(word.originalWord, word.translations);
      }
      return;
    });
  }

  searchWord(inputValue: string, isAllWords: boolean) {
    const searchebleWords = isAllWords
      ? this.getAllWords()
      : this.getUnknownWords();
    return searchebleWords.filter(
      (word) =>
        word.originalWord.includes(inputValue.toLocaleLowerCase()) ||
        word.translations.some((translation) =>
          translation.includes(inputValue.toLocaleLowerCase())
        )
    );
  }
}
