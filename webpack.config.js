const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",

  entry: {
    main: "./index.tsx",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx", "_redirects"],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.pug",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  devServer: {
    port: 4200,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: ["pug-loader"],
      },
      {
        test: /\.jsx?$|tsx?$/i,
        use: ["babel-loader"],
      },
      {
        test: /\.(svg|jpg|png)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: { localIdentName: "[name]__[local]__[hash:base64:5]" },
            },
          },
        ],
      },
    ],
  },
};
