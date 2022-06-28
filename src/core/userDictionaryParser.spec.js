import UserDictionaryParser from "./UserDictionaryParser";
import wordsJSON from "../__mocks__/wordsExample.json";
import invalidJSON from "../__mocks__/invalidWords.json";
import Word from "./word";

describe(".UserDictionaryParser", () => {
  describe(".getDictionary", () => {
    it("returns Dictionary", async () => {
      const file = new File([JSON.stringify(wordsJSON)], "Words");
      const userDictionaryParser = new UserDictionaryParser(file);

      const dictionary = await userDictionaryParser.getDictionary();

      expect(dictionary.getAllWords()).toEqual([
        new Word("sky", ["небо"]),
        new Word("fruit", ["фрукт", "плод", "фруктовый", "плодоносить"]),
      ]);
    });

    it("throws an error if file structure is not valid", async () => {
      const file = new File([JSON.stringify(invalidJSON)], "Words");
      const userDictionaryParser = new UserDictionaryParser(file);

      await expect(userDictionaryParser.getDictionary()).rejects.toThrow(
        "Not a valid structure in file"
      );
    });
  });
});
