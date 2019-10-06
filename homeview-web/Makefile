.PHONY: deploy-prod
deploy-prod: build
	assume-role admin sls deploy --stage production

.PHONY: build
build: 
	npm run-script build

.PHONY: deploy
deploy: build
	assume-role admin sls deploy

.PHONY: update
update: deploy
	assume-role admin aws s3 sync build/ s3://homeview-website

.PHONY: remove
remove: 
	assume-role admin sls remove --stage dev

