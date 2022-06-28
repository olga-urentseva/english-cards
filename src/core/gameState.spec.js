import GameState from "./GameState";
import Dictionary from "./dictionary";

describe(".GameState", () => {
  const mockedScore = 0;
  const mockedWordsWeightList = [1, 1];

  describe(".toString", () => {
    it("returns JSON", () => {
      const gameState = new GameState(mockedScore, mockedWordsWeightList);

      const answer = gameState.toString();

      expect(answer).isPrototypeOf(String);
      expect(
        answer.includes(mockedScore + "") &&
          answer.includes(mockedWordsWeightList + "")
      ).toBeTruthy();
    });
  });

  describe("static fromString", () => {
    it("returns an instance of GameState", () => {
      const mockedStr = JSON.stringify({
        score: mockedScore,
        wordsWeightList: mockedWordsWeightList,
      });
      const mockedWords = ["test", ["тест"], ["apple", ["яблоко"]]];

      const dictionary = new Dictionary(undefined, mockedWords);
      const answer = GameState.fromString(mockedStr, dictionary);

      expect(answer).toBeInstanceOf(GameState);
    });

    it("returns an start score and start words weights at the game start", () => {
      const mockedWords = [
        ["test", ["тест"]],
        ["apple", ["яблоко"]],
      ];

      const dictionary = new Dictionary(undefined, mockedWords);
      const answer = GameState.fromString("", dictionary);

      expect(answer.score).toBe(0);
      expect(answer.wordsWeightList).toEqual([1, 1]);
    });
  });
});
