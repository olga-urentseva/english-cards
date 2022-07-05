import React from "react";
import { screen, act, fireEvent } from "@testing-library/react";
import { render } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";

import Game from "../../../core/game";
import AppManager from "../../../core/AppManager";
import GameBlock from "./index";
import Word from "../../../core/word";
import Dictionary from "../../../core/dictionary";

jest.mock("../../../core/AppManager");
jest.useFakeTimers();

describe("GameBlock", () => {
  const mockedWords = [["test", ["тест"]]];
  let dictionary;
  let game;
  let user;

  beforeEach(() => {
    user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    dictionary = new Dictionary(null, mockedWords);
    game = new Game({ score: 99, wordsWeightList: [1] }, dictionary);
    jest.spyOn(game, "answer");
    jest.spyOn(game, "skip");
    jest.spyOn(game, "getRandomWord");
    AppManager.prototype.loadGame.mockImplementation(() => game);
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
      dictionary = new Dictionary(null, mockedWords);
      const expectedWord = dictionary.getAllWords()[0];

      it("handles correct answer", async () => {
        await user.type(screen.getByRole("textbox"), correctUserAnswer);
        fireEvent.click(screen.getByRole("button", { name: /проверить/i }));

        expect(game.answer).toHaveBeenCalledWith(
          expectedWord,
          correctUserAnswer
        );
        expect(game.getRandomWord).toHaveBeenCalled();
        expect(screen.getByText(/demo/i)).toBeInTheDocument();
        expect(screen.queryByText(/демо/i)).not.toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
      });
    });

    describe("incorrectly", () => {
      const expectedWord = dictionary.getAllWords()[0];

      it("handles incorrect answer", async () => {
        await user.type(screen.getByRole("textbox"), incorrectUserAnswer);
        await user.click(screen.getByRole("button", { name: /проверить/i }));

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
    beforeEach(async () => {
      render(<GameBlock />);
      game.getRandomWord.mockClear();

      await user.click(screen.getByRole("button", { name: /не знаю/i }));
    });

    it("handles skip", async () => {
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
