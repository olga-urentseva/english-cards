import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "../../../core/game";
import GameSaveManager from "../../../core/gameSaveManager";
import GameBlock from "./index";
import Word from "../../../core/word";
import Dictionary from "../../../core/dictionary";

jest.mock("../../../core/gameSaveManager");
jest.useFakeTimers();

describe("GameBlock", () => {
  const mockedWords = [["test", ["тест"]]];
  const dictionary = new Dictionary(null, mockedWords);
  const game = new Game({ score: 99, wordsWeightList: [1] }, dictionary);

  jest.spyOn(game, "answer");
  jest.spyOn(game, "skip");
  jest.spyOn(game, "getRandomWord");
  GameSaveManager.prototype.load.mockImplementation(() => game);
  const a = new GameSaveManager();

  beforeEach(() => {
    game.answer.mockClear();
    game.skip.mockClear();
    game.getRandomWord.mockClear();
  });

  it("shows the score", () => {
    render(<GameBlock />);

    expect(screen.queryByText("99")).toBeInTheDocument();
  });

  it("shows the word to translate", () => {
    render(<GameBlock />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.queryByText("тест")).not.toBeInTheDocument();
  });

  describe("when user answer", () => {
    let newWord;
    const correctUserAnswer = " тест ";
    const incorrectUserAnswer = " блаблабла ";

    beforeEach(() => {
      render(<GameBlock />);
      game.getRandomWord.mockClear();

      game.getRandomWord.mockImplementationOnce(() => {
        newWord = new Word("demo", ["демо"]);
        return newWord;
      });
    });

    describe("correctly", () => {
      const expectedWord = dictionary.getAllWords()[0];
      beforeEach(() => {
        userEvent.type(screen.getByRole("textbox"), correctUserAnswer);
        userEvent.click(screen.getByRole("button", { name: /проверить/i }));
      });

      it("handles correct answer", () => {
        expect(game.answer).toHaveBeenCalledWith(
          expectedWord,
          correctUserAnswer
        );
        expect(game.getRandomWord).toHaveBeenCalled();
        expect(screen.getByText(/demo/i)).toBeInTheDocument();
        expect(screen.queryByText(/демо/i)).not.toBeInTheDocument();
        expect(screen.getByText(game.score)).toBeInTheDocument();
      });
    });

    describe("incorrectly", () => {
      const expectedWord = dictionary.getAllWords()[0];
      beforeEach(() => {
        userEvent.type(screen.getByRole("textbox"), incorrectUserAnswer);
        userEvent.click(screen.getByRole("button", { name: /проверить/i }));
      });

      it("handles incorrect answer", () => {
        expect(game.answer).toHaveBeenCalledWith(
          expectedWord,
          incorrectUserAnswer
        );
        expect(screen.getByText(/тест/i)).toBeInTheDocument();

        act(() => {
          jest.advanceTimersByTime(1000);
        });

        expect(game.getRandomWord).not.toHaveBeenCalled();

        act(() => {
          jest.advanceTimersByTime(3000);
        });

        expect(game.getRandomWord).toHaveBeenCalled();

        expect(screen.getByText(/demo/i)).toBeInTheDocument();
        expect(screen.queryByText(/демо/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("when user skip", () => {
    beforeEach(() => {
      render(<GameBlock />);
      game.getRandomWord.mockClear();

      userEvent.click(screen.getByRole("button", { name: /не знаю/i }));
    });

    it("handles skip", () => {
      expect(game.skip).toHaveBeenCalled();
      expect(screen.getByText(/тест/i)).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(game.getRandomWord).not.toHaveBeenCalled();
      game.getRandomWord.mockImplementationOnce(
        () => new Word("demo", ["демо"])
      );

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(game.getRandomWord).toHaveBeenCalled();

      expect(screen.getByText(/demo/i)).toBeInTheDocument();
      expect(screen.queryByText(/демо/i)).not.toBeInTheDocument();
    });
  });
});
