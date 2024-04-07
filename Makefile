# Variables
DOCKER_COMPOSE ?= docker compose

# Build the containers
build:
	$(DOCKER_COMPOSE) build

# Start the containers in the background
up:
	$(DOCKER_COMPOSE) up -d

# Stop and remove the containers, networks, volumes, and images created by 'up'
down:
	$(DOCKER_COMPOSE) down --remove-orphans

# Show logs of the containers in real-time
logs:
	$(DOCKER_COMPOSE) logs -f

# Restart the containers
restart:
	$(DOCKER_COMPOSE) restart

# Stop running containers
stop:
	$(DOCKER_COMPOSE) stop

# Remove all containers, networks, volumes, and images created by 'up'
clean:
	$(DOCKER_COMPOSE) down -v

# Connect to the application container
cli:
	$(DOCKER_COMPOSE) exec app sh

# Rebuild and restart the containers
rebuild:
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d
