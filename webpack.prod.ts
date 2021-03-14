import path from "path";
import ManifestPlugin from "webpack-manifest-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import merge from "webpack-merge";
// @ts-ignore
import common from "./webpack.common";

const config = {
  mode: "production",
  entry: ["./src/index"],
  output: {
    filename: "[name].[hash].js",
    publicPath: "patient/assets/",
    path: path.resolve("./public/assets/"),
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          // just need to exclude these they will created by webpack as other chunk
          test: /.?[\\/]node_modules[\\/](?!(react-pdf|pdfjs-dist|react-table|d3)).*?/,
          name: "patientVendors",
          chunks: "all",
        },
      },
    },
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devtool: false,
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new UglifyJsPlugin({
      sourceMap: true,
      include: /\.min\.js$/,
      uglifyOptions: {
        ecma: 5,
      },
    }),
    new ManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
};

module.exports = merge(common, config);
