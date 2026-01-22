# =============================================================================
# Builder stage
# =============================================================================
FROM oven/bun:1 AS builder

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
RUN bun run build

# =============================================================================
# Runner stage
# =============================================================================
FROM oven/bun:1 AS runner

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Default .env (can be overridden via volume mount or env_file)
COPY .env .env

# Create directories for persistent data
RUN mkdir -p .tmp public/uploads

ENV NODE_ENV=production

EXPOSE 1337

CMD ["bun", "run", "start"]