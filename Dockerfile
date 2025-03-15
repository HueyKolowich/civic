FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

# Development stage
FROM base AS dev

WORKDIR /app
COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

CMD ["npm", "start"]
