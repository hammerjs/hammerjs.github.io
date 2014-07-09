build:
	npm install
	git clone git://github.com/eightmedia/hammer.js hammerjs
	cd hammerjs && \
		git checkout "2.0.x" && \
		npm install && \
		grunt build && \
		mv hammer.js ../dist/hammer.js && \
		mv hammer.min.js ../dist/hammer.min.js && \
		mv hammer.min.map ../dist/hammer.min.map
	gulp build-site
	rm -rf hammerjs

.PHONY: build
