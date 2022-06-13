import Game from "./game";
import GameState from "./GameState";
import Dictionary from "./dictionary";

export default class GameSaveManager {
  private store: Storage = window.localStorage;

  constructor(store: Storage = window.localStorage) {
    this.store = store;
  }

  save(game: Game) {
    this.store.setItem("gameState", game.state.toString());
  }

  load() {
    const dictionary = new Dictionary();
    const gameState = GameState.fromString(
      this.store.getItem("gameState"),
      dictionary
    );
    return new Game(gameState, dictionary);
  }

  removeSave() {
    this.store.removeItem("userWords");
    this.store.removeItem("gameState");
  }
}
