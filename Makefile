release:
	npm install
	cp node_modules/hammer-timejs/hammer-time.js dist/hammer-time.js
	cp node_modules/hammer-timejs/dist/hammer-time.min.js dist/hammer-time.min.js
	cp node_modules/hammerjs/hammer.js dist/hammer.js
	cp node_modules/hammerjs/hammer.min.js dist/hammer.min.js
	cp node_modules/hammerjs/hammer.min.js.map dist/hammer.min.js.map
	rm -f dist/hammer.min.map
	node scripts/generate-data.js
	node scripts/generate-changelog.js

jekyll:
	bundle exec jekyll build
	make sass

serve:
	bundle exec jekyll serve

sass:
	npx sass assets/css/index.scss assets/css/index.css --style=compressed
