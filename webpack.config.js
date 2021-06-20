const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var glob = require("glob")

pages =  glob.sync("*", {
  cwd: "src/html",
  nodir: true
});

module.exports = {
  entry: "./src/index.js",
  mode: 'development',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    port: 9000,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...pages.map((page) => //зачем точки?
      new HtmlWebpackPlugin({
        filename: page,
        template: `src/html/${page}`,
        minify: false
      })
    )
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // { test: /\.png$/, type: 'asset/resource' }
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      //   options: {
      //     minimize: false
      //   }
      // },
    ],
  },
};
