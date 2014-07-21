var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        index: './src/assets/js/index.js'
    },
    output: {
        path: "./assets/js/",
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ["./node_modules", "./bower_components"],
        extensions: ["", ".js"]
    }
};
