build:
	npm install
	cd node_modules/hammerjs && \
		npm install && \
		grunt concat string-replace uglify:min && \
		mv hammer.js ../../dist/hammer.js && \
		mv hammer.min.js ../../dist/hammer.min.js && \
		mv hammer.min.map ../../dist/hammer.min.map
	node scripts/generate-data.js
	node node_modules/jsdoc/jsdoc.js -c jsdoc.json
	jekyll build
