# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install dependencies, using --legacy-peer-deps to ignore peer-dep conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the 'builder' stage
COPY --from=builder /app/build /usr/share/nginx/html

# (Optional) Copy a custom nginx.conf if you need SPA routing, caching, etc.
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
