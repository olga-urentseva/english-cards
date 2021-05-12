import Game from "./game";
import Word from "./word";

describe("game", () => {
  describe(".loadWords", () => {
    it("loads words by yourself when creating a game", () => {
      const game = new Game();
      expect(game.loadWords()).toBeDefined();
    });

    it("loads words based on initial value of words list", () => {
      const game = new Game(null, [
        new Word("test", ["тест"]),
        new Word("testing", ["тестирование"]),
      ]);

      expect(game.list.length).toBe(2);
    });
  });

  describe(".getRandomWord", () => {
    it("gives a random word from a list with two values", () => {
      const game = new Game(null, [
        new Word("test", ["тест"]),
        new Word("testing", ["тестирование"]),
      ]);
      expect(game.getRandomWord()).toBeDefined();
    });

    it("does not give a randow word if the list is empty", () => {
      const game = new Game(null, []);
      expect(game.getRandomWord()).toBe(null);
    });
  });

  describe(".answer", () => {
    const testWord = new Word("test", ["тест"]);
    const game = new Game(null, [testWord]);
    it("returns true if word is correct", () => {
      expect(game.answer(testWord, "тест")).toBeTruthy();
    });

    it("returns true if one of the two user words is correct", () => {
      expect(game.answer(testWord, "тест, тестирование")).toBeTruthy();
    });

    it("returns true if person enter one of some variations of translation", () => {
      expect(
        game.answer(new Word("test", ["тест", "тестинг"]), "тестинг")
      ).toBeTruthy();
    });

    it("increase the score if word correct", () => {
      const game = new Game(null, [testWord]);
      game.answer(testWord, "тест");
      expect(game.getScore()).toEqual(1);
    });

    it("returns false if word is incorrect", () => {
      expect(game.answer(testWord, "не тест")).toBeFalsy();
    });
  });

  describe(".getScore", () => {
    it("returns the score", () => {
      const game = new Game();
      expect(game.getScore()).toBeGreaterThanOrEqual(0);
    });
  });

  describe(".getState", () => {
    it("returns the state of the game", () => {
      const game = new Game();
      expect(game.getState()).toEqual({
        score: expect.any(Number),
        wordsWeightList: expect.any(Array),
      });
    });
  });
});
