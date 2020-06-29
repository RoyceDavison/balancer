//entry -> output
const path = require("path");
// console.log(path.resolve(__dirname, "public/"));

//loader: customize the behaviors of webpack
//babel-core allows you run babel_tool from webpack,  babel-loader is a webpack plugin is to teach webpack how to run babel
module.exports = (env) => {
  const isProduction = env === "production";
  return {
    //entry: "./src/app.js",
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
