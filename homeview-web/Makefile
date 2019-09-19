.PHONY: deploy-prod
deploy-prod: build
	assume-role admin sls deploy --stage production

.PHONY: build
build: 
	npm run-script build

.PHONY: deploy
deploy: build
	assume-role admin sls deploy

.PHONY: remove
remove: 
	assume-role admin sls remove --stage dev

