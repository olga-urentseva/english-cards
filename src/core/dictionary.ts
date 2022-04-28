import allWords from "../words/words";
import Word from "./word";

function memoizable(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  let memoizedValue;

  descriptor.value = function (...args: any[]) {
    return (memoizedValue ||= originalMethod.apply(this, args));
  };
}

export default class Dictionary {
  store: Storage;
  memoizedAllWords: Word[];
  words: [string, string[]][];

  constructor(store = window.localStorage, words = allWords) {
    this.store = store;
    this.words = words;
  }

  @memoizable
  getAllWords() {
    return this.words.map((word) => new Word(word[0], word[1]));
  }

  /** This method returns an unknown words (words that weight is more than 1). */
  /** Weight if the words we get from the gameState. */
  getUnknownWords(): Word[] {
    const gameState = this.store.getItem("gameState");
    const allWords = this.getAllWords();
    if (gameState === null) {
      return [];
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
