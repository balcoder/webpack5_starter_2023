const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", //[name] will be replaced bykey of entry obj above(bundle)
    clean: true, //delete old bundles
    assetModuleFilename: "images/[name][ext]", //keep the original name
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true, // open browser
    hot: true, // hot reload
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        //test: /\.(png|svg|jpeg|jpg|gif)$/i,
        test: /\.(png|jpeg|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: "svg-sprite-loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossy optimization with custom option
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["imagemin-mozjpeg", { progressive: true, quality: 90 }],
              ["imagemin-pngquant", { quality: [0.5, 0.9] }],
            ],
          },
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
