#!/bin/bash
# First-time SSL certificate initialization for Let's Encrypt
# Run this on the VM after DNS is configured
#
# Usage: EMAIL=your@email.com ./init-ssl.sh

set -e

DOMAIN="drawvaltine.com"

if [ -z "$EMAIL" ]; then
  echo "Error: EMAIL environment variable is required"
  echo "Usage: EMAIL=your@email.com ./init-ssl.sh"
  exit 1
fi

echo "=== SSL Certificate Initialization ==="

# Create dummy certificates so nginx can start
echo "Creating dummy certificates..."
mkdir -p ./certbot/conf/live/$DOMAIN
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    -subj '/CN=localhost'" certbot

# Start nginx with dummy certs
echo "Starting nginx..."
docker compose -f docker-compose.prod.yml up -d nginx-proxy

# Delete dummy certificates
echo "Removing dummy certificates..."
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN && \
  rm -rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

# Request real certificates
echo "Requesting Let's Encrypt certificate..."
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN" certbot

# Reload nginx with real certificates
echo "Reloading nginx..."
docker compose -f docker-compose.prod.yml exec nginx-proxy nginx -s reload

echo "=== SSL setup complete! ==="
echo "Your site should now be accessible at https://$DOMAIN"
