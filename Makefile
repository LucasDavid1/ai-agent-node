.PHONY: build up up-logs down restart logs shell migrate test test-app createapp

SERVICE_NAME := web

build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting Express application..."
	docker-compose up -d --build
	@echo "Express application started at http://localhost:3000"

down:
	@echo "Stopping Express application..."
	docker-compose down

restart:
	@echo "Restarting Express application..."
	docker-compose down
	docker-compose up -d --build
	@echo "Express application started at http://localhost:3000"

logs:
	@echo "Fetching logs..."
	docker-compose logs -f

shell:
	@echo "Opening shell..."
	docker-compose exec $(SERVICE_NAME) sh

migrate:
	@echo "Running database migrations..."
	docker-compose exec $(SERVICE_NAME) npm run migrate

test:
	@echo "[TEST]"
	docker-compose exec $(SERVICE_NAME) npm test
	@echo "Done"

test-app:
	@echo "Running tests for $(app_name)..."
	docker-compose exec $(SERVICE_NAME) npm test -- $(app_name)

createapp:
	@echo "Creating new Express module $(app_name)..."
	docker-compose exec $(SERVICE_NAME) sh -c "mkdir -p src/$(app_name) && touch src/$(app_name)/index.js"