const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
import merge from "webpack-merge";
// @ts-ignore
import common from "./webpack.common";

const config = {
  mode: "development",
  entry: ["./src/index"],
  target: "web",
  devtool: "eval-cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    before: (app: any) => {
      app.use("*", (__: any, res: any, next: any) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
      });
    },
    clientLogLevel: "warning",
    port: 4444,
    stats: "minimal",
    hot: true,
  },
};

module.exports = merge(common, config);
