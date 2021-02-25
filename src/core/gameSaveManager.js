import Game from "./game";

export default class GameSaveManager {
  static save(game) {
    window.localStorage.setItem("gameState", JSON.stringify(game.getState()));
  }

  static load() {
    const gameState = window.localStorage.getItem("gameState");

    return new Game(gameState ? JSON.parse(gameState) : null);
  }

  static removeSave() {
    window.localStorage.removeItem("gameState");
  }
}
