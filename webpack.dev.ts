const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
import merge from "webpack-merge";
// @ts-ignore
import common from "./webpack.common";

const config = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: ["./src/index"],
  target: "web",
  devtool: "eval-cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    clientLogLevel: "warning",
    port: 4444,
    stats: "minimal",
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = merge(common, config);
