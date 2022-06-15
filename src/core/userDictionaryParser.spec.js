import UserDictionaryParser from "./UserDictionaryParser";
import wordsJSON from "../__mocks__/wordsExample.json";
import invalidJSON from "../__mocks__/invalidWords.json";

describe(".UserDictionaryParser", () => {
  describe(".getDictionary", () => {
    it("returns Dictionary", () => {
      const file = new File(wordsJSON, "Words");
      const userDictionaryParser = new UserDictionaryParser(file);

      const answer = userDictionaryParser.getDictionary();

      expect(answer).toBeInstanceOf(Promise);
      // expect(Promise.resolve()).toBeInstanceOf(Dictionary);
    });

    it("throws an error if file structure is not valid", async () => {
      const file = new File(invalidJSON, "Words");
      const userDictionaryParser = new UserDictionaryParser(file);

      expect(userDictionaryParser.getDictionary()).not.toBe(Promise);
      await expect(userDictionaryParser.getDictionary).rejects.toThrow();
    });
  });
});
