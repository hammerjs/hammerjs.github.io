var fs = require('fs');


var contents = fs.readFileSync('./node_modules/hammerjs/CHANGELOG.md', {encoding: 'utf8'});
var header = "---\nlayout: default\ntitle: Changelog\n---\n\n";

fs.writeFileSync("./changelog.md", header + contents);
