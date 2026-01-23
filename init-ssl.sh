#!/bin/bash
# First-time SSL certificate initialization for Let's Encrypt
# Run this on the VM after DNS is configured

set -e

DOMAIN="drawvaltine.com"
EMAIL="test@example.com"

echo "=== SSL Certificate Initialization ==="

# Create dummy certificates so nginx can start
echo "Creating dummy certificates..."
mkdir -p ./certbot/conf/live/$DOMAIN
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    -subj '/CN=localhost'" certbot

# Start nginx with dummy certs
echo "Starting nginx..."
docker compose up -d nginx-proxy

# Delete dummy certificates
echo "Removing dummy certificates..."
docker compose run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN && \
  rm -rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

# Request real certificates
echo "Requesting Let's Encrypt certificate..."
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN" certbot

# Reload nginx with real certificates
echo "Reloading nginx..."
docker compose exec nginx-proxy nginx -s reload

echo "=== SSL setup complete! ==="
echo "Your site should now be accessible at https://$DOMAIN"
