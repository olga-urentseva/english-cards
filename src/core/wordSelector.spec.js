import Word from "./word";
import WordSelector from "./wordSelector";

describe("WordSelector", () => {
  let words;
  beforeAll(() => {
    words = [
      new Word("hello", "привет"),
      new Word("apple", "яблоко"),
      new Word("map", "карта"),
      new Word("cup", "чашка"),
      new Word("table", "стол"),
    ];
  });

  it("gives word based on weights", () => {
    const wordSelector = new WordSelector(words, [1, 2, 1, 2, 3]);

    // |--|----|--|----|------|
    // 0        ^             9
    // |--------.-------------|
    // 0       0.38           1

    wordSelector.randomFn = () => 0.38;

    expect(wordSelector.getWord()).toBe(words[2]);

    // |--|----|--|----|------|
    // 0           ^          9
    // |-----------.----------|
    // 0          0.45        1

    wordSelector.randomFn = () => 0.45;

    expect(wordSelector.getWord()).toBe(words[3]);
  });

  it("creates a new instance with default value of weights that equal to 1", () => {
    const wordSelector = new WordSelector(words);

    expect(wordSelector.weightsOfWords).toEqual([1, 1, 1, 1, 1]);
  });

  describe(".increaseWordWeight", () => {
    it("increases the weight of word", () => {
      const wordSelector = new WordSelector(words, [1, 1, 1, 1, 1]);
      wordSelector.increaseWordWeight(words[1]);

      expect(wordSelector.weightsOfWords).toEqual([1, 2, 1, 1, 1]);
    });
  });

  describe(".decreaseWordweight", () => {
    it("decreases the weight of word with limit", () => {
      const wordSelector = new WordSelector(words, [1, 2, 1, 1, 1]);
      wordSelector.decreaseWordWeight(words[1]);

      expect(wordSelector.weightsOfWords).toEqual([1, 1, 1, 1, 1]);

      // decreasing of the word weight is only possible to 1

      wordSelector.decreaseWordWeight(words[1]);
      expect(wordSelector.weightsOfWords).toEqual([1, 1, 1, 1, 1]);
    });
  });
});
