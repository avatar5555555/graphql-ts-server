.PHONY: dev start prod test gen

gen:
	npm run generate

dev:
	npm run start:dev

test:
	npm test

start:
	npm start

prod: build start
