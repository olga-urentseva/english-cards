import Game from "./game";

export default class GameSaveManager {
  private store: Storage = window.localStorage;

  constructor(store: Storage = window.localStorage) {
    this.store = store;
  }

  save(game: Game) {
    this.store.setItem("gameState", JSON.stringify(game.getState()));
  }

  load() {
    const gameState = this.store.getItem("gameState");
    return new Game(gameState ? JSON.parse(gameState) : null);
  }

  removeSave() {
    // fix this
    this.store.removeItem("userWords");
    this.store.removeItem("gameState");
  }
}
