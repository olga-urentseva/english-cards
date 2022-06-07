import Dictionary from "./dictionary";
import Game from "./game";
import GameSaveManager from "./gameSaveManager";
import Word from "./word";

describe("GameSaveManager", () => {
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
  let dictionary;
  let game;
  let gameSaver;
  beforeEach(() => {
    dictionary = new Dictionary(localStorage, [word]);
    game = new Game(mockedState, dictionary);
    gameSaver = new GameSaveManager(localStorage);
  });
  describe(".save", () => {
    it("saves game", () => {
      gameSaver.save(game);
      expect(localStorage.setItem.mock.calls[0][0]).toBe("gameState");
      expect(JSON.parse(localStorage.setItem.mock.calls[0][1])).toEqual(
        mockedState
      );
    });
  });

  describe(".load", () => {
    it("loads game", () => {
      const loadedGame = gameSaver.load();
      expect(loadedGame).toBeInstanceOf(Game);
    });
  });

  describe(".removeSave", () => {
    it("removes current game from Storage", () => {
      gameSaver.removeSave();
      expect(localStorage.removeItem.mock.calls[0][0]).toBe("gameState");
    });
  });
});
