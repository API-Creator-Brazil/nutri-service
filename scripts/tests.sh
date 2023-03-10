#!/bin/bash

setup() {
    yarn
    docker compose up -d
    sleep 1
    npx prisma migrate dev
}

cleanup() {
    docker compose down
}

run() {
    npx jest --runInBand
}

trap cleanup EXIT
setup
run
cleanup
