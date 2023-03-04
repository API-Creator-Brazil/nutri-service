#!/bin/bash

setup() {
    docker compose up -d
    sleep 1
}

cleanup() {
    docker compose down
}

initDocker() {
    docker build --network host -t nutri .
    docker run --network host --rm nutri
}

trap cleanup EXIT
setup
initDocker
cleanup
