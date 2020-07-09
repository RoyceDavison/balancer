//entry -> output
const path = require("path");
const webpack = require("webpack");
// console.log(path.resolve(__dirname, "public/"));

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({
    path: ".env.test",
  });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: ".env.development",
  });
}

//loader: customize the behaviors of webpack
//babel-core allows you run babel_tool from webpack,  babel-loader is a webpack plugin is to teach webpack how to run babel
module.exports = (env) => {
  const isProduction = env === "production";
  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "public/"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.s?css$/, // ? make the s optional
          use: [
            {
              //style-loader: Automatically injects styles into the DOM using multiple <style></style>
              loader: "style-loader",
            },
            {
              //The css-loader interprets @import and url() like import/require() and will resolve them.

              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    //plugins: [CSSExtract],
    plugins: [
      new webpack.DefinePlugin(
        {
          "process.env.FIREBASE_API_KEY": JSON.stringify(
            process.env.FIREBASE_API_KEY
          ),
        },
        {
          "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
            process.env.FIREBASE_AUTH_DOMAIN
          ),
        },
        {
          "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
            process.env.FIREBASE_DATABASE_URL
          ),
        },
        {
          "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
            process.env.FIREBASE_PROJECT_ID
          ),
        },
        {
          "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
            process.env.FIREBASE_STORAGE_BUCKET
          ),
        },
        {
          "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
            process.env.FIREBASE_MESSAGING_SENDER_ID
          ),
        },
        {
          "process.env.FIREBASE_APP_ID": JSON.stringify(
            process.env.FIREBASE_APP_ID
          ),
        }
      ),
    ],
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      compress: true,
      //It tells the devServer to handle the routing via client side page
      //When using the HTML5 History API,
      //the index.html page will likely have to be served in place of any 404 responses.
      historyApiFallback: true,
    },
  };
};
