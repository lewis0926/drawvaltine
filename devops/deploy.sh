#!/bin/bash
# Deploy frontend and strapi application
# Prerequisites: Run init-ssl.sh first to set up nginx-proxy and SSL

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== Deploying application ==="

# Generate production configs (from project root)
cd "$PROJECT_ROOT"
sh ./generate-config.sh production

# Go back to devops dir for scp paths
cd "$SCRIPT_DIR"

# Ensure remote directories exist
ssh drawvaltine "mkdir -p ~/drawvaltine/frontend ~/drawvaltine/strapi"

# SCP files to the server
echo "Copying files to server..."
scp ./docker-compose.prod.yml drawvaltine:~/drawvaltine/
scp ../frontend/config.json drawvaltine:~/drawvaltine/frontend/
scp ../strapi/.env drawvaltine:~/drawvaltine/strapi/

# SSH into the server and deploy
echo "Deploying containers..."
ssh drawvaltine << 'ENDSSH'
  cd ~/drawvaltine
  sudo docker compose -f docker-compose.prod.yml pull
  sudo docker compose -f docker-compose.prod.yml down
  sudo docker compose -f docker-compose.prod.yml up -d
ENDSSH

echo "=== Deployment complete! ==="
