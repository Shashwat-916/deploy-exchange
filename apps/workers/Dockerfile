FROM oven/bun:1 AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=workers --docker

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
RUN cd packages/prisma-db && bun run generate

# Final production stage using slim base image
FROM oven/bun:1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app .

# Strip out unnecessary Prisma engines to save space
RUN rm -f /app/node_modules/@prisma/engines/*windows* \
          /app/node_modules/@prisma/engines/*darwin* \
          /app/node_modules/@prisma/engines/*musl*

WORKDIR /app/apps/workers

CMD [ "bun", "run", "start" ]