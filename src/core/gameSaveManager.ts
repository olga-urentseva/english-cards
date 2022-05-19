import Dictionary from "./dictionary";
import Game from "./game";

export default class GameSaveManager {
  store: Storage;

  constructor(store = window.localStorage, dictionary?: Dictionary) {
    this.store = store;
  }

  save(game: Game) {
    this.store.setItem("gameState", JSON.stringify(game.getState()));
  }

  load() {
    console.log(this.store);
    const gameState = this.store.getItem("gameState");

    return new Game(gameState ? JSON.parse(gameState) : null);
  }

  removeSave() {
    this.store.removeItem("gameState");
  }
}
