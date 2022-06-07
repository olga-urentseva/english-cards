import { array } from "prop-types";

export default class WordsUploader {
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  get wordsDB() {
    let dataBase: IDBDatabase;
    if (!window.indexedDB) {
      window.alert(
        "Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны"
      );
    }
    let request = window.indexedDB.open("User words");

    request.onupgradeneeded = function () {
      if (!dataBase.objectStoreNames.contains("words")) {
        dataBase.createObjectStore("words", { keyPath: "id" });
      }
    };

    return dataBase;
  }

  uploadWords(uploadedWords: JSON) {
    let db = this.wordsDB;

    const transaction = db.transaction("words", "readwrite");

    // get the store
    const words = transaction.objectStore("words");

    let request = words.add(uploadedWords);

    request.onerror = () => {
      return "Error";
    };

    request.onsuccess = () => {
      console.log("Файл загружен", request.result);
    };
  }

  async checkFileValidation() {
    const fileContent = await this.readFile();

    const parsedFile = JSON.parse(fileContent);
    console.log(parsedFile.length <= 0);

    return Array.isArray(parsedFile[0]) &&
      parsedFile.length === 0 &&
      parsedFile.map(
        (arr: [string, string[]]) =>
          typeof arr[0] !== "string" &&
          !Array.isArray(
            arr[1] &&
              arr[1].map((array) => (typeof array !== "string" ? false : true))
              ? false
              : true
          )
      )
      ? false
      : true;
  }

  readFile() {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        resolve(event.target.result as string);
      });

      reader.readAsText(this.file);
    });
  }
}
