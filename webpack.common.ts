import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: ["node_modules", "."],
    alias: {
      src: path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
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
        options: {
          // ... other options
          plugins: [
            // ... other plugins
            isDevelopment && require.resolve("react-refresh/babel"),
          ].filter(Boolean),
        },
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
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};

module.exports = config;
