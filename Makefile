.PHONY: install test build build-worker content-seed-sql wrangler-config deploy-worker verify-deployment status add commit push deploy

status:
	git status

add:
	git add .

commit:
	@if git status --porcelain | grep -q '^.[^ ]'; then \
		echo "Error: You have unstaged changes. Please stage all changes with 'make add' before committing."; \
		exit 1; \
	fi
	@if [ -z "$$(git diff --cached --name-only)" ]; then \
		echo "Error: No staged changes to commit."; \
		exit 1; \
	fi
ifeq ($(msg),)
ifeq ($(file),)
	git commit
else
	git commit -F "$(file)"
endif
else
	git commit -m "$(msg)"
endif

push:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Error: You have uncommitted changes. Please commit before pushing."; \
		exit 1; \
	fi
ifeq ($(branch),)
	git push origin master
else
	git push origin $(branch)
endif

deploy: status
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Error: You have uncommitted changes. Please commit before deploying."; \
		exit 1; \
	fi
	@echo "No uncommitted changes. Deploying to Cloudflare..."
	$(MAKE) deploy-worker
