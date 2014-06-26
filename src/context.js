var marked = require('marked');
var gzipSize = require('gzip-size');
var fs = require('fs');
var prettyBytes = require('pretty-bytes');

function readHammerFileSync(path) {
    return fs.readFileSync(__dirname +'/../node_modules/hammerjs/'+ path, {encoding:'utf8'});
}

module.exports = {
    version: (function() {
        return JSON.parse(readHammerFileSync('package.json')).version;
    })(),

    gzipped: (function() {
        return prettyBytes(gzipSize.sync(readHammerFileSync('hammer.min.js')));
    })()
};
