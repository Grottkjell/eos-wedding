const path = require("path");

module.exports = {
    entry: ["@babel/polyfill", "./src/wedding.js"],
    output: {
        path: path.resolve(__dirname, "../static"),
        filename: "wedding.js",
    },
    target: "web",
    module: {
        rules: [
            // the 'transform-runtime' plugin tells Babel to
            // require the runtime instead of inlining it.
            {
              test: /\.m?js$/,
              exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.jsx?$/],
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread'],
                }
              }
            }
          ]
    }
};