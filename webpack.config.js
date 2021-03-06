const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AutoPrefixedPlugin = require("autoprefixer");

const ENTRY_PATH = path.join(__dirname, "./src/index.js");
const OUTPUT_PATH = path.join(__dirname, "./build");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  favicon: "favicon.ico",
  hash: true,
  xhtml: true
});

const autoprefixedPlugin = AutoPrefixedPlugin({
  browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
});

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: false,
    sourceMap: true,
    minimize: true
  }
};

const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: "[local]__[hash:base64:5]",
    minimize: true
  }
};

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    sourceMap: true,
    plugins: () => [autoprefixedPlugin]
  }
};

module.exports = {
  entry: ENTRY_PATH,
  output: {
    path: OUTPUT_PATH,
    filename: "./bundle.js"
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", CSSModuleLoader, postCSSLoader, "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", CSSLoader, postCSSLoader]
      },
      {
        test: /\.ico$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
