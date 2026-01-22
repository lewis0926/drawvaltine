# =============================================================================
# Builder stage (use Node.js for Strapi build - better native module support)
# =============================================================================
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock* ./
RUN npm install

COPY . .

RUN npm run build

# =============================================================================
# Runner stage
# =============================================================================
FROM node:20-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y libvips-dev && rm -rf /var/lib/apt/lists/*

# Strapi needs full project structure at runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 1337

CMD ["npm", "run", "start"]