.PHONY: dev build start prod test gen

gen:
	npm run generate

dev:
	npm run start:dev

build:
	npm run build

test:
	npm test

start:
	npm start

prod: build start
