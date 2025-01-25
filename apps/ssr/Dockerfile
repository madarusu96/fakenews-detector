# Stage 1: Install dependencies
FROM node:18-alpine AS installer

# Install necessary dependencies
RUN apk add --no-cache libc6-compat
RUN apk update

# Set the working directory
WORKDIR /app


# Copy the entire application
COPY . .
# Install pnpm and turbo
RUN npm install -g pnpm turbo

# Install npm dependencies
RUN pnpm install

# Stage 2: Final image
FROM installer AS runner

# Set working directory
WORKDIR /app

# Expose the required port
EXPOSE 3000


# Command to start the application
CMD pnpm run dev:ssr
