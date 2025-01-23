FROM node:22.13.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:apaleo

FROM node:22.13.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM nginx:alpine AS runner
COPY --from=builder /app/dist/apps/apaleo/browser /usr/share/nginx/html
COPY --from=deps /app/node_modules /usr/share/nginx/html/node_modules
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]