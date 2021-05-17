const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
import merge from "webpack-merge";
// @ts-ignore
import common from "./webpack.common";

const config = {
  mode: "development",
  output: {
    publicPath: "http://localhost:4444/",
  },
  entry: ["./src/index"],
  target: "web",
  devtool: "eval-cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    before: (app: any) => {
      app.use("*", (req: any, res: any, next: any) => {
        res;
        console.log(req.baseUrl);
        next();
      });
    },
    clientLogLevel: "error",
    port: 4444,
    stats: "minimal",
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = merge(common, config);
