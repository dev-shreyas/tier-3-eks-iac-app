## builder stage: install dependencies
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

## final stage: run the app
FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server.js"]