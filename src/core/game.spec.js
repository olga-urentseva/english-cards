import Dictionary from "./dictionary";
import Game from "./game";
import Word from "./word";
import GameState from "./GameState";

describe("game", () => {
  const mockedWords = [["test", ["тест"]]];
  describe(".getRandomWord", () => {
    it("gives a random word from a list with two values", () => {
      const dictionary = new Dictionary(null, mockedWords);
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      expect(game.getRandomWord()).toBeDefined();
    });
  });

  describe(".answer", () => {
    const dictionary = new Dictionary(null, mockedWords);
    const expectedWord = new Word(mockedWords[0][0], mockedWords[0][1]);

    it("returns true if word is correct", () => {
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      expect(game.answer(expectedWord, " тест ")).toBeTruthy();
    });

    it("returns true if one of the two user words is correct", () => {
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      expect(game.answer(expectedWord, "тест, тестирование")).toBeTruthy();
    });

    it("returns true if person enter one of some variations of translation", () => {
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      expect(
        game.answer(new Word("clap", ["хлопать", "хлопок"]), "хлопать")
      ).toBeTruthy();
    });

    it("decrease the score if word correct", () => {
      const gameState = new GameState(0, [1]);
      const dictionary = new Dictionary(null, mockedWords);
      const game = new Game(gameState, dictionary);
      const actualWord = new Word(mockedWords[0][0], mockedWords[0][1]);
      game.answer(actualWord, "тест");
      expect(game.getScore()).toEqual(1);
    });

    it("returns false if word is incorrect", () => {
      const dictionary = new Dictionary(null, mockedWords);
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      const actualWord = new Word(mockedWords[0][0], mockedWords[0][1]);
      expect(game.answer(actualWord, "не тест")).toBeFalsy();
    });
  });

  describe(".getScore", () => {
    it("returns the score", () => {
      const dictionary = new Dictionary(null, mockedWords);
      const gameState = new GameState(0, [1]);
      const game = new Game(gameState, dictionary);
      expect(game.getScore()).toBeGreaterThanOrEqual(0);
    });
  });
});
