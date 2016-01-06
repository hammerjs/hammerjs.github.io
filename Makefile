release:
	npm install
	cd node_modules/hammer-timejs && \
		mv hammer-time.js ../../dist/hammer-time.js && \
		mv dist/hammer-time.min.js ../../dist/hammer-time.min.js
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
	node_modules/node-sass/bin/node-sass assets/css/index.scss assets/css/index.css --output-style=compressed
