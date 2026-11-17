# Multi-stage Dockerfile for ShoeStop Frontend (React + Vite)

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Pass build-time environment variable for backend API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy source code and build production assets
COPY . .
RUN npm run build

# Stage 2: Production serve stage using Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Health check to verify Nginx is actively serving pages
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
