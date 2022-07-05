import Game from "./game";
import GameState from "./GameState";
import Dictionary from "./dictionary";

export default class AppManager {
  private store: Storage;
  public dictionary: Dictionary;

  constructor(
    store: Storage = window.localStorage,
    dictionary: Dictionary = new Dictionary()
  ) {
    this.store = store;
    this.dictionary = dictionary;
  }

  saveGame(game: Game) {
    this.store.setItem("gameState", game.state.toString());
  }

  get gameState() {
    return GameState.fromString(
      this.store.getItem("gameState"),
      this.dictionary
    );
  }

  loadGame() {
    return new Game(this.gameState, this.dictionary);
  }

  removeGameSave() {
    this.dictionary.resetWordsInDB();
    this.store.removeItem("gameState");
  }

  setDictionary(dictionary?: Dictionary) {
    this.removeGameSave();
    this.dictionary = dictionary || new Dictionary();
  }
}
