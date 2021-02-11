module.exports = (api) => {
  const isTest = api.env("test");

  return {
    plugins: ["@babel/plugin-proposal-class-properties"],

    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        isTest
          ? {
              targets: {
                node: "current",
              },
            }
          : {},
      ],
    ],
  };
};
