import Dictionary from "./dictionary";
import Word from "./word";
import GameState from "./GameState";

describe("Dictionary", () => {
  const mockedStoredWords = [
    ["test", ["тест"]],
    ["music", ["музыка"]],
  ];
  let localStorage;
  beforeEach(() => {
    localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  describe(".getAllWords", () => {
    it("returns all words", () => {
      const expectedFirstWord = new Word(
        mockedStoredWords[0][0],
        mockedStoredWords[0][1]
      );
      const expectedSecondWord = new Word(
        mockedStoredWords[1][0],
        mockedStoredWords[1][1]
      );
      const expectedAnswer = [expectedFirstWord, expectedSecondWord];
      const dictionary = new Dictionary(localStorage, mockedStoredWords);
      expect(dictionary.getAllWords()).toEqual(expectedAnswer);
    });
  });

  describe(".getUnknownWords", () => {
    it("returns an empty array if there are no unknown words", () => {
      localStorage.getItem.mockReturnValue(null);
      const dictionary = new Dictionary(localStorage, mockedStoredWords);
      const gameState = new GameState(0, [1, 1]);
      expect(dictionary.getUnknownWords(gameState)).toEqual([]);
    });
    it("returns unknown word, a word that weight is more than 1", () => {
      localStorage.getItem.mockReturnValue('{ "wordsWeightList": [1, 2] }');
      const dictionary = new Dictionary(localStorage, mockedStoredWords);
      const gameState = new GameState(0, [2, 1]);
      const expectedValue = new Word(
        mockedStoredWords[0][0],
        mockedStoredWords[0][1]
      );
      expect(dictionary.getUnknownWords(gameState)).toHaveLength(1);
      expect(dictionary.getUnknownWords(gameState)).toEqual([expectedValue]);
    });
  });

  // describe(".searchWord", () => {
  //   it("search words", () => {
  //     const dictionary = new Dictionary(localStorage, mockedStoredWords);
  //     const expectedWord = new Word(
  //       mockedStoredWords[0][0],
  //       mockedStoredWords[0][1]
  //     );
  //     expect(dictionary.searchWord("те", true)).toEqual([expectedWord]);
  //   });
  // });
});
