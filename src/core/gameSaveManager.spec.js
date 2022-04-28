import Dictionary from "./dictionary";
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
    const mockedState = {
      wordsWeightList: [1],
      score: 100,
    };

    const word = new Word("test", ["тест"]);
    const dictionary = new Dictionary(localStorage, [word]);
    const game = new Game(mockedState, dictionary);
    let gameSaver = new GameSaveManager(localStorage, dictionary);

    gameSaver.save(game);

    expect(localStorage.setItem.mock.calls[0][0]).toBe("gameState");

    expect(JSON.parse(localStorage.setItem.mock.calls[0][1])).toEqual(
      mockedState
    );
  });
});
