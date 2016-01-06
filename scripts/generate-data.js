var fs = require('fs');
var gzipSize = require('gzip-size');
var prettyBytes = require('pretty-bytes');

var data = {
    version: (function () {
        return JSON.parse(
            fs.readFileSync('./node_modules/hammerjs/package.json', {encoding: 'utf8'})
        ).version;
    })(),

    timeVersion: (function () {
        return JSON.parse(
            fs.readFileSync('./node_modules/hammer-timejs/package.json', {encoding: 'utf8'})
        ).version;
    })(),

    gzipped: (function () {
        return prettyBytes(gzipSize.sync(
            fs.readFileSync('./dist/hammer.min.js', {encoding: 'utf8'})
        ));
    })(),

    timeGzipped: (function () {
        return prettyBytes(gzipSize.sync(
            fs.readFileSync('./dist/hammer-time.min.js', {encoding: 'utf8'})
        ));
    })()
};

fs.writeFileSync("./_data/hammer.json", JSON.stringify(data));
