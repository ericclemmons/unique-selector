build: index.js components
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@mocha-phantomjs test/index.html

.PHONY: test clean
