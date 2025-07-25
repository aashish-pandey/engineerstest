#!/bin/bash

# List of container names
containers=("engineerstest-db" "engineerstest-api")

# Loop through each and remove if exists
for container in "${containers[@]}"
do
  if [ "$(docker ps -aq -f name=$container)" ]; then
    echo "Removing existing container: $container"
    docker rm -f $container
  fi
done

echo "Starting docker-compose..."
docker-compose up --build
