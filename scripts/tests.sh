#!/bin/bash

export COMPOSE_FILE=docker/infra.yml
docker compose up -d
sleep 1
npx prisma migrate dev
npx jest --runInBand
docker compose down
