# Multi-stage Dockerfile for FofoDashboard
# Stage 1: Build the Next.js frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY webapp/package*.json ./
RUN npm install

COPY webapp/ ./
RUN npm run build

# Stage 2: Setup Python backend and serve both
FROM python:3.11-slim

# Install Node.js for serving the frontend
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/.next ./webapp/.next
COPY --from=frontend-builder /app/public ./webapp/public
COPY --from=frontend-builder /app/package*.json ./webapp/
COPY --from=frontend-builder /app/next.config.ts ./webapp/

# Install only production dependencies for frontend
WORKDIR /app/webapp
RUN npm install --omit=dev

WORKDIR /app

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

# Expose ports
EXPOSE 3000 8000

# Start the application
CMD ["./start.sh"]
