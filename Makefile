# FIXME: use gulp to rewrite
default: help

install:
	npm install

dev:
	npm run dev

dist:
	npm run dist

release:
	gas r -y

publish: dist
	npm publish

test:
	npm run test:watch

new-component:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))

new-lang:
	node build/bin/new-lang.js $(filter-out $@,$(MAKECMDGOALS))


help:
	@echo "make install               ---  install dependencies"
	@echo "make dev                   ---  start developing"
	@echo "make dist                  ---  build and distribute"
	@echo "make publish               ---  publish to npm"
	@echo "make test                  ---  run tests"
	@echo "make new-component <name>  ---  create a new component"
	@echo "make new-lang <lang>       ---  add a new language"
