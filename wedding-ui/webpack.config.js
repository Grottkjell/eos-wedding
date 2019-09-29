const path = require("path");

module.exports = {
    entry: "./src/wedding.js",
    output: {
        path: path.resolve(__dirname, "../static"),
        filename: "wedding.js",
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};