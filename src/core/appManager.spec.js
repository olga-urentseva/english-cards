import Dictionary from "./dictionary";
import Game from "./game";
import AppManager from "./AppManager";
import GameState from "./GameState";

describe("GameSaveManager", () => {
  const localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  };
  const word = `["test", ["тест"]]`;
  let dictionary;
  let game;
  let appManager;
  beforeEach(() => {
    dictionary = new Dictionary(localStorage, [JSON.parse(word)]);
    const gameState = new GameState(100, [1]);
    game = new Game(gameState, dictionary);
    appManager = new AppManager(localStorage, dictionary);
  });
  describe(".save", () => {
    it("saves game", () => {
      const expectedValue = {
        wordsWeightList: [1],
        score: 100,
      };
      appManager.saveGame(game);
      expect(localStorage.setItem.mock.calls[0][0]).toBe("gameState");
      expect(JSON.parse(localStorage.setItem.mock.calls[0][1])).toEqual(
        expectedValue
      );
    });
  });

  describe(".load", () => {
    it("loads game", () => {
      const loadedGame = appManager.loadGame();
      expect(loadedGame).toBeInstanceOf(Game);
    });
  });

  describe(".removeSave", () => {
    it("removes current game from Storage", () => {
      dictionary.resetWordsInDB = jest.fn();
      appManager.removeGameSave();

      expect(dictionary.resetWordsInDB).toHaveBeenCalled();
      expect(localStorage.removeItem.mock.calls[0][0]).toBe("gameState");
    });
  });

  describe(".setDictionary", () => {
    it("remove old dictionary and set the new one", () => {
      appManager.removeGameSave = jest.fn();
      const newDictionary = new Dictionary();
      appManager.setDictionary(newDictionary);

      expect(appManager.removeGameSave).toHaveBeenCalled();
      expect(appManager.dictionary).toBe(newDictionary);
    });
  });
});
