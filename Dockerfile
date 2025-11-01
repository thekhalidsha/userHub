# --- Stage 1: Build Vite App ---
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the production-ready Vite app
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Expose port 80 for default HTTP
EXPOSE 8000

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]