import Dictionary from "./dictionary";

export default class GameState {
  score: number;
  wordsWeightList: number[];

  private constructor(score: number = 0, wordsWeightList: number[]) {
    this.score = score;
    this.wordsWeightList = wordsWeightList;
  }

  toString() {
    return JSON.stringify({
      score: this.score,
      wordsWeightList: this.wordsWeightList,
    });
  }

  static fromString(
    str: string | undefined,
    dictionary: Dictionary
  ): GameState {
    const allWords = dictionary.getAllWords();

    if (!str) {
      return new GameState(undefined, Array(allWords.length).fill(1));
    }

    const parsedString = JSON.parse(str);

    if (
      typeof parsedString.score === "undefined" ||
      typeof parsedString.wordsWeightList === "undefined" ||
      !Array.isArray(parsedString.wordsWeightList) ||
      parsedString.wordsWeightList.some((ww: any) => typeof ww !== "number")
    ) {
      throw new Error("given string is not valid state");
    }

    const diff = allWords.length - parsedString.wordsWeightList.length;
    const deficit = (Math.abs(diff) + diff) / 2;

    const wordsWeightList = [
      ...parsedString.wordsWeightList,
      ...Array(deficit).fill(1),
    ];

    return new GameState(parsedString.score, wordsWeightList);
  }
}
