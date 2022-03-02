import Game from "./game";

export default class GameSaveManager {

  store: Storage;

  constructor(store = window.localStorage) {
    this.store = store;
  }

  save(game) {
    this.store.setItem("gameState", JSON.stringify(game.getState()));
  }

  load() {
    const gameState = this.store.getItem("gameState");

    return new Game(gameState ? JSON.parse(gameState) : null, );
  }

  removeSave() {
    this.store.removeItem("gameState");
  }
}
