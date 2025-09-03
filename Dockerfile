# Use official Playwright image with Node.js
FROM mcr.microsoft.com/playwright:v1.55.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create directories for reports
RUN mkdir -p test-results playwright-report

# Set environment variables
ENV CI=true
ENV NODE_ENV=test

# Expose port for report server
EXPOSE 9323

# Default command
CMD ["npm", "test"]
