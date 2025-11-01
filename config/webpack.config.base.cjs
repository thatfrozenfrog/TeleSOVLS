const path = require("path");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const webpackConfig = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
    // Clean the output directory before emit (Webpack 5+)
    clean: true,
  },
  target: "web",
  externals: {
    jquery: "$",
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]s$/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: process.env.npm_config_report ? [new BundleAnalyzerPlugin()] : [],
};

module.exports = webpackConfig;
