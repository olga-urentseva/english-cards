import Word from "./word";
import WordSelector from "./wordSelector";

describe("WordSelector", () => {
  it("gives word based on weights", () => {
    const words = [
      new Word("hello", "привет"),
      new Word("apple", "яблоко"),
      new Word("map", "карта"),
      new Word("cup", "чашка"),
      new Word("table", "стол"),
    ];

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
});
