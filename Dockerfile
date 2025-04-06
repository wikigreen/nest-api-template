# Stage 1: Install dependencies and build the project
FROM node:22.14-alpine AS builder

# Set working directory to /app
WORKDIR /app

# Copy the entire project (frontend, backend, etc.)
COPY . .

# Install dependencies
RUN npm install

# Build stage
RUN npm run build

FROM node:22.14-alpine AS production

WORKDIR /app

# Copy the backend build and frontend build artifacts from the `builder` stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# Expose the backend port
EXPOSE ${PORT}

# Command to run the backend server
CMD ["node", "./dist/main.js"]
