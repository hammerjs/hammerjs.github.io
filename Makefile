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
	bundle exec jekyll build

jekyll:
	bundle exec jekyll build --watch

serve:
	bundle exec jekyll serve

sass:
	node-sass assets/css/index.scss assets/css/index.css  --output-style=compressed
