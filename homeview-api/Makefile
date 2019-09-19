.PHONY: deploy-prod
deploy-prod: 
	assume-role admin sls deploy --stage production

.PHONY: deploy
deploy: 
	assume-role admin sls deploy

.PHONY: remove
remove: 
	assume-role admin sls remove --stage dev

