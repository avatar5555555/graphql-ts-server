.PHONY: dev build start prod

dev:
	npm run start:dev

build:
	npm run build

start:
	npm start

prod: build start
