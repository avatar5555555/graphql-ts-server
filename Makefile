.PHONY: dev build start prod test gen

gen:
	npm run generate

dev:
	npm run start:dev

test:
	npm test

build:
	npm run build

start:
	npm start

prod: build start
