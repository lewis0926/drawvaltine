#!/bin/bash
# Deploy frontend and payload application

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
ssh drawvaltine "mkdir -p ~/drawvaltine/frontend ~/drawvaltine/payload"

# SCP files to the server
echo "Copying files to server..."
scp ./docker-compose.yml drawvaltine:~/drawvaltine/
scp ../frontend/config.json drawvaltine:~/drawvaltine/frontend/
scp ../payload/.env drawvaltine:~/drawvaltine/payload/

# SSH into the server and deploy
echo "Deploying containers..."
ssh drawvaltine << 'ENDSSH'
  cd ~/drawvaltine
  sudo docker compose -f docker-compose.yml pull
  sudo docker compose -f docker-compose.yml down
  sudo docker compose -f docker-compose.yml up -d
ENDSSH

echo "=== Deployment complete! ==="
