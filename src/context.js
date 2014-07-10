var marked = require('marked');
var fs = require('fs');
var gzipSize = require('gzip-size');
var prettyBytes = require('pretty-bytes');
var highlight = require('highlight.js')


marked.setOptions({
  highlight: function (code, lang) {
      console.log(code, lang);
    return highlight.highlightAuto(code, [lang]).value;
  }
});


module.exports = {
    version: (function() {
        return JSON.parse(
            fs.readFileSync('./node_modules/hammerjs/package.json', {encoding:'utf8'})
        ).version;
    })(),

    gzipped: (function() {
        return prettyBytes(gzipSize.sync(
            fs.readFileSync('./dist/hammer.min.js', {encoding:'utf8'})
        ));
    })()
};
