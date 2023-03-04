[![Build](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/build.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/build.yml)
[![Lint](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/lint.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/lint.yml)
[![Tests](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/tests.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/tests.yml)
[![Security](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/secscan.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/secscan.yml)

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
