import React from "react";
import { render, screen } from "../../../../test-utils";
import userEvent from "@testing-library/user-event";
import words from "../../../words/words";

import DictionaryPage from "./index";

describe("DictionaryPage", () => {
  it("allows to see the words", () => {
    render(<DictionaryPage />);
    words.forEach(([originalWord, translations]) => {
      expect(screen.queryByText(originalWord)).toBeInTheDocument();
      translations.forEach((translation) => {
        expect(screen.queryAllByText(translation).length).toBeGreaterThan(0);
      });
    });
  });

  describe("allows user to search the word", () => {
    it("allows to search by the original word", () => {
      render(<DictionaryPage />);
      userEvent.type(screen.getByRole("textbox"), "app");

      expect(
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "apple";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
          );

          return nodeHasText && childrenDontHaveText;
        })
      ).toBeInTheDocument();
    });

    it("allows to search by word translation", () => {
      render(<DictionaryPage />);
      userEvent.type(screen.getByRole("textbox"), "ябл");

      expect(
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "яблоко";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
          );

          return nodeHasText && childrenDontHaveText;
        })
      ).toBeInTheDocument();
    });

    it("allows to searc a word ignoring case", () => {
      render(<DictionaryPage />);

      userEvent.type(screen.getByRole("textbox"), "ЯбЛ");
      expect(
        screen.getByText((content, node) => {
          const hasText = (node) => node.textContent === "яблоко";
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
          );

          return nodeHasText && childrenDontHaveText;
        })
      ).toBeInTheDocument();
    });
  });

  it("does not show words other than input", () => {
    render(<DictionaryPage />);
    userEvent.type(screen.getByRole("textbox"), "start");

    const showingItems = screen.queryAllByText((content, node) => {
      const hasText = (node) => node.textContent === "start";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );

      return nodeHasText && childrenDontHaveText;
    });

    const matchedWords = words.filter(([originalWord, translations]) =>
      originalWord.includes("start")
    );

    words.forEach(([originalWord, translations]) => {
      if (originalWord.includes("start")) {
        return;
      }
      expect(
        screen.queryByText((content, node) => {
          const hasText = (node) => node.textContent === originalWord;
          const nodeHasText = hasText(node);
          const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
          );
          return nodeHasText && childrenDontHaveText;
        })
      ).not.toBeInTheDocument();
    });

    expect(showingItems.length).toEqual(matchedWords.length);
  });
});
