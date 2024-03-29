import Dictionary from "./dictionary";
import Word from "./word";
import WordSelector from "./wordSelector";
import GameState from "./GameState";

describe("WordSelector", () => {
  const words = [
    ["hello", ["привет"]],
    ["bye", ["пока"]],
    ["test", ["тест"]],
    ["window", ["окно"]],
    ["flower", ["цветок"]],
  ];

  it("gives word based on weights", () => {
    const dictionary = new Dictionary(null, words);
    const gameState = new GameState(1, [1, 2, 1, 2, 3]);
    const wordSelector = new WordSelector(gameState, dictionary);
    let expectedWord = new Word(words[2][0], words[2][1]);

    // |--|----|--|----|------|
    // 0        ^             9
    // |--------.-------------|
    // 0       0.38           1

    wordSelector.randomFn = () => 0.38;

    expect(wordSelector.getWord()).toEqual(expectedWord);

    // |--|----|--|----|------|
    // 0           ^          9
    // |-----------.----------|
    // 0          0.45        1

    wordSelector.randomFn = () => 0.45;

    expectedWord = new Word(words[3][0], words[3][1]);
    expect(wordSelector.getWord()).toEqual(expectedWord);
  });

  it("creates a new instance with default value of weights that equal to 1", () => {
    const dictionary = new Dictionary(null, words);
    const wordSelector = new WordSelector(
      GameState.fromString(undefined, dictionary),
      dictionary
    );

    expect(wordSelector.gameState.wordsWeightList).toEqual([1, 1, 1, 1, 1]);
  });

  describe(".increaseWordWeight", () => {
    it("increases the weight of word", () => {
      const dictionary = new Dictionary(null, words);
      const gameState = new GameState(1, [1, 1, 1, 1, 1]);
      const wordSelector = new WordSelector(gameState, dictionary);

      const allWords = dictionary.getAllWords();
      const word = allWords[1];
      wordSelector.increaseWordWeight(word);
      expect(wordSelector.gameState.wordsWeightList).toEqual([1, 2, 1, 1, 1]);
    });
  });

  describe(".decreaseWordWeight", () => {
    it("decreases the weight of word with limit", () => {
      const dictionary = new Dictionary(null, words);
      const gameState = new GameState(1, [1, 2, 1, 1, 1]);
      const wordSelector = new WordSelector(gameState, dictionary);

      const allWords = dictionary.getAllWords();
      const word = allWords[1];

      wordSelector.decreaseWordWeight(word);

      expect(wordSelector.gameState.wordsWeightList).toEqual([1, 1, 1, 1, 1]);

      // decreasing of the word weight is only possible to 1

      wordSelector.decreaseWordWeight(word);
      expect(wordSelector.gameState.wordsWeightList).toEqual([1, 1, 1, 1, 1]);
    });
  });
});
