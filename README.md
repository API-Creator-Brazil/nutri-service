[![Build](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/build.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/build.yml)
[![Lint](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/lint.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/lint.yml)
[![Tests](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/tests.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/tests.yml)
[![Security](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/secscan.yml/badge.svg)](https://github.com/API-Creator-Brazil/nutri-service/actions/workflows/secscan.yml)

# Description

Service that manages nutritionists application

# Configuration

Set a `.env` file following `.env.example`.

# Running in local environment

```bash
# install dependencies
yarn
# start docker compose services
docker compose up -d
# run application
npx nest start
# remove docker compose
docker compose down
```

# Testing

```bash
docker compose up -d
npx jest --runInBand
docker compose down
```
