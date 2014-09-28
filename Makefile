release:
	npm install
	cd node_modules/hammerjs && \
		npm install && \
		grunt concat string-replace uglify:min usebanner && \
		mv hammer.js ../../dist/hammer.js && \
		mv hammer.min.js ../../dist/hammer.min.js && \
		mv hammer.min.map ../../dist/hammer.min.map
	node scripts/generate-data.js
	node scripts/generate-changelog.js
	node node_modules/jsdoc/jsdoc.js -c jsdoc.json

jekyll:
	bundle exec jekyll build
	make sass

serve:
	bundle exec jekyll serve

sass:
	node-sass assets/css/index.scss assets/css/index.css --output-style=compressed
