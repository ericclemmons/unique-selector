build: index.js components
	@node_modules/.bin/component build --dev

components: component.json
	@node_modules/.bin/component install --dev

clean:
	rm -fr build components template.js

test:
	@node_modules/.bin/mocha-phantomjs test/index.html

.PHONY: test clean
