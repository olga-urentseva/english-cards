import { object } from "prop-types";

const words = {
  Apple: "Яблоко",
  Fruit: "Фрукт",
  Flower: "Цветок",
};

export const getWord = () => {
  const wordKeys = Object.keys(words);
  const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
  return [randomKey, words[randomKey]];
};

export default words;
