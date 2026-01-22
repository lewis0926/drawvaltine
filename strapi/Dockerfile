# =============================================================================
# Builder stage
# =============================================================================
FROM node:22-alpine AS builder

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /app
COPY package.json package-lock.json favicon.png ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

ENV PATH=app/node_modules/.bin:$PATH

COPY . .
RUN npm run build

# =============================================================================
# Runner stage
# =============================================================================
FROM node:22-alpine AS runner

RUN apk update && apk add --no-cache vips-dev

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/config ./config
COPY --from=builder /app/dist/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/favicon.png ./
COPY --from=builder /app/server.js ./

RUN mkdir -p /app/db && chown -R node:node /app

ENV PATH=/node_modules/.bin:$PATH

USER node

EXPOSE 1337

CMD ["npm", "run", "start"]
