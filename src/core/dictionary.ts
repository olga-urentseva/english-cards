import memoizable from "./lib/decorators/memoizable";
import Word from "./word";

import allWords from "../words/words";
import GameState from "./GameState";

export default class Dictionary {
  store: Storage;
  words: [string, string[]][];

  constructor(store = window.localStorage, words?: [string, string[]][]) {
    this.store = store;
    this.words = words || this.getWordsFromDB() || allWords;
  }

  @memoizable
  getAllWords() {
    return this.words.map((word) => new Word(word[0], word[1]));
  }

  /** This method returns an unknown words (words that weight is more than 1). */
  /** Weight if the words we get from the gameState. */
  getUnknownWords(gameState: GameState): Word[] {
    const allWords = this.getAllWords();

    const wordsScore = gameState.wordsWeightList;

    return allWords.filter((word: Word, index: number) => {
      if (wordsScore[index] > 1) {
        return new Word(word.originalWord, word.translations);
      }
      return;
    });
  }

  saveToBD() {
    this.store.setItem("userWords", JSON.stringify(this.words));
  }

  resetWordsInDB() {
    this.store.removeItem("userWords");
  }

  getWordsFromDB() {
    const userWordsRawString = this.store.getItem("userWords");
    return userWordsRawString && JSON.parse(userWordsRawString);
  }
}
