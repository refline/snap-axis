const HtmlPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: __dirname + "/../docs",
    clean: true,
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                module: "esnext",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                namedExport: true,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [new HtmlPlugin({ template: "./public/index.html" })],
  devServer: {
    historyApiFallback: true,
    port: 5875,
  },
};
