var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        index: './src/assets/js/index.js'
    },
    devtool: 'source-map',
    output: {
        path: "./assets/js/",
        publicPath: "/assets/js/",
        filename: "[name].js"
    },
    resolve: {
        modulesDirectories: ["./node_modules", "./bower_components"],
        extensions: ["", ".js"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
