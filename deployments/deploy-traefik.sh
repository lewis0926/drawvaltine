#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Go back to devops dir for scp paths
cd "$SCRIPT_DIR"

# Ensure remote directories exist
ssh drawvaltine "mkdir -p ~/traefik"

# SCP files to the server
echo "Copying files to server..."
scp ./docker-compose.traefik.yml drawvaltine:~/traefik/docker-compose.yml

# SSH into the server and deploy
echo "Deploying containers..."
ssh drawvaltine << 'ENDSSH'
  cd ~/traefik
  sudo docker compose -f docker-compose.yml down
  sudo docker compose -f docker-compose.yml up -d
ENDSSH

echo "=== Deployment complete! ==="
