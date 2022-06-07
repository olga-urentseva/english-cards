import Dictionary from "./dictionary";

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

class UserDictionaryParser {
  private file: File;

  constructor(file: File) {
    this.file = file;
  }

  async getDictionary(): Promise<Dictionary> {
    const rawContent = await this.getRawFileContent();

    if (
      Array.isArray(rawContent) &&
      rawContent.every(
        (el) =>
          Array.isArray(el) &&
          el.length === 2 &&
          typeof el[0] === "string" &&
          Array.isArray(el[1]) &&
          el[1].every((translation) => typeof translation === "string")
      )
    ) {
      return new Dictionary(undefined, rawContent as [string, string[]][]);
    }

    throw new Error("Not a valid structure in file");
  }

  private readFile() {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        console.log("gh");

        resolve(event.target.result as string);
      });

      reader.addEventListener("error", () => {
        reject();
      });
      console.log(this.file);

      reader.readAsText(this.file);
    });
  }

  private async getRawFileContent(): Promise<JSONValue> {
    const fileContent = await this.readFile();

    return JSON.parse(fileContent);
  }
}

export default UserDictionaryParser;
