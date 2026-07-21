FROM oven/bun:1 AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=engine --docker

# Install dependencies using the pruned json files
FROM oven/bun:1 AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./
RUN bun install

# Copy full source and generate files
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=installer /app .
COPY --from=pruner /app/out/full/ .

# Final production stage using slim base image
FROM oven/bun:1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app .

WORKDIR /app/apps/engine

CMD [ "bun", "run", "start" ]
