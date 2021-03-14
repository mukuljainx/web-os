import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: ["node_modules", "."],
    alias: {
      src: path.resolve(__dirname, "./src"),
      // webpack was unable to understand the instance import
      // and export, so we have explicitly tell it which comes
      // from the node_modules
      axios: path.resolve(__dirname, "./node_modules/axios"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.svg($|\?)/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 65000,
              mimetype: "image/svg+xml",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)($|\?)/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 65000,
            },
          },
        ],
      },
      {
        test: /\.css?/,
        use: [
          { loader: "style-loader", options: { esModule: true } },
          "css-loader",
        ],
      },
    ],
  },
};

module.exports = config;
