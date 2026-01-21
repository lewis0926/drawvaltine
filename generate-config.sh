#!/bin/bash
set -e

ENV="${1:-local}"

echo "Generating configs for environment: $ENV"

# Generate frontend config.json
echo "Generating frontend/config.json..."
pkl eval "frontend/pkl/configs/${ENV}.pkl" -f json > frontend/config.json

# Generate strapi .env
echo "Generating strapi/.env..."
pkl eval "strapi/pkl/configs/${ENV}.pkl" -x "toEnv()" > strapi/.env

echo "Done!"