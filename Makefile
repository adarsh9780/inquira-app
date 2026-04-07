.PHONY: install test build build-worker content-seed-sql wrangler-config deploy-worker verify-deployment

install:
	npm install

test:
	npm test

build:
	npm run build

build-worker:
	npm run build:worker

content-seed-sql:
	npm run content:seed:sql

wrangler-config:
	npm run wrangler:config

deploy-worker:
	npm run deploy:worker

verify-deployment:
	npm run verify:deployment
