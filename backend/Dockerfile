# Production Dockerfile for ShoeStop Backend (Node.js + Express)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy dependency definition files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Set default production environment variables
ENV NODE_ENV=production \
    PORT=5000

# Expose backend port
EXPOSE 5000

# Health check to monitor backend health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

# Start server using node in production
CMD ["node", "server.js"]
