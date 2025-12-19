# Makefile for Jekyll site with Docker

.PHONY: help serve build stop clean logs shell install

# Default target
.DEFAULT_GOAL := help

# Variables
COMPOSE_FILE = docker-compose.yml
SERVICE_NAME = jekyll

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

serve: ## Build and serve the Jekyll site with live reload
	@echo "🚀 Starting Jekyll development server..."
	@docker-compose up --build $(SERVICE_NAME)

build: ## Build the Docker image
	@echo "🔨 Building Docker image..."
	@docker-compose build $(SERVICE_NAME)

stop: ## Stop the running containers
	@echo "🛑 Stopping containers..."
	@docker-compose down

clean: ## Stop containers and remove images
	@echo "🧹 Cleaning up containers and images..."
	@docker-compose down --rmi all --volumes --remove-orphans

logs: ## Show logs from the Jekyll container
	@docker-compose logs -f $(SERVICE_NAME)

shell: ## Open a shell in the Jekyll container
	@echo "🐚 Opening shell in Jekyll container..."
	@docker-compose run --rm $(SERVICE_NAME) /bin/sh

install: ## Install dependencies in the container
	@echo "📦 Installing dependencies..."
	@docker-compose run --rm $(SERVICE_NAME) bundle install

serve-detached: ## Start the server in detached mode (background)
	@echo "🚀 Starting Jekyll development server in background..."
	@docker-compose up --build -d $(SERVICE_NAME)
	@echo "✅ Server started! Visit http://localhost:4000"
	@echo "📝 Run 'make logs' to see output or 'make stop' to stop"

status: ## Show status of containers
	@docker-compose ps
