.PHONY: install test build build-worker content-seed-sql wrangler-config deploy-worker verify-deployment status add commit push deploy dev upload-public-downloads upload-public-downloads-help

env ?= .env
uploads_root ?=

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

deploy:
	@set -a; \
	. ./.env; \
	set +a; \
	$(MAKE) push; \
	$(MAKE) deploy-worker

deploy-worker:
	npm run deploy:worker

dev:
	npm run dev

upload-public-downloads:
ifeq ($(help),1)
	@$(MAKE) upload-public-downloads-help
else
	@if [ -z "$(version)" ]; then \
		echo "Usage: make upload-public-downloads version=0.5.27 [env=.env] [uploads_root=$(HOME)/Downloads/inquira-uploads]"; \
		echo "Help:  make upload-public-downloads-help"; \
		echo "Alt:   make upload-public-downloads help=1"; \
		exit 1; \
	fi
	@set -a; \
	. ./$(env); \
	set +a; \
	node scripts/uploadPublicDownloadsToR2.mjs \
		--version "$(version)" \
		$(if $(strip $(uploads_root)),--uploads-root "$(uploads_root)",)
endif

upload-public-downloads-help:
	@echo "Upload desktop installers and manifest to Cloudflare R2."
	@echo ""
	@echo "Usage:"
	@echo "  make upload-public-downloads version=0.5.27 [env=.env] [uploads_root=$(HOME)/Downloads/inquira-uploads]"
	@echo ""
	@echo "Required env vars in the selected env file:"
	@echo "  CLOUDFLARE_API_TOKEN"
	@echo "  CLOUDFLARE_ACCOUNT_ID"
	@echo "  R2_BUCKET (or CLOUDFLARE_R2_BUCKET)"
	@echo ""
	@echo "Optional env vars:"
	@echo "  PUBLIC_DOWNLOADS_BASE_URL (default: https://downloads.inquiraai.com)"
	@echo "  PUBLIC_RELEASE_NOTES_URL (default: GitHub release URL for the version)"
	@echo ""
	@echo "Notes:"
	@echo "  - Expects files in <uploads_root>/vX.YZ (one .dmg and one .exe)."
	@echo "  - If uploads_root is omitted, script auto-checks:"
	@echo "    ~/Downloads/inquira-uploads, then ~/Downloads/inquira-upload"
	@echo "  - Loads env with: set -a; . ./<env>; set +a"
