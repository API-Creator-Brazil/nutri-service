# Description

Service that manages nutritionists application

# Building

```bash
> yarn
> npx nest build
```

# Testing

```bash
> export COMPOSE_FILE=docker/infra.yml
> docker compose up -d
> sleep 1
> npx jest --runInBand
> docker compose down
```

# Executing

```bash
> export COMPOSE_FILE=docker/infra.yml
> docker compose up -d
> npx nest start
> docker compose down
```
