import Game from "./game";
import GameSaveManager from "./gameSaveManager";
import Word from "./word";

describe("GameSaveManager", () => {
  it("save game", () => {
    const localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
    };
    let gameSaver = new GameSaveManager(localStorage);
    const game = new Game({ score: 100 }, [new Word("test", "тест")]);

    gameSaver.save(game);

    expect(localStorage.setItem.mock.calls[0][0]).toBe("gameState");
    expect(JSON.parse(localStorage.setItem.mock.calls[0][1])).toEqual({
      score: 100,
      wordsWeightList: [1],
    });
  });
});
