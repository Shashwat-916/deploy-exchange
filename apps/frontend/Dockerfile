FROM oven/bun:1 AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker

# Install dependencies using the pruned json files
FROM oven/bun:1 AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./
RUN bun install

# Build the Next.js frontend
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=installer /app .
COPY --from=pruner /app/out/full/ .
WORKDIR /app/apps/frontend
RUN bun run build

# Production runtime using Node standalone
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Use the pre-existing node user from the alpine image
USER node

COPY --chown=node:node --from=builder /app/apps/frontend/.next/standalone ./
COPY --chown=node:node --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --chown=node:node --from=builder /app/apps/frontend/public ./apps/frontend/public

CMD ["node", "apps/frontend/server.js"]