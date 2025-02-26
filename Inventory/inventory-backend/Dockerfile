# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json first (for caching)
COPY package.json package-lock.json ./



# Install dependencies
RUN npm install 
# Copy all project files inside inventory-backend/
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Expose backend port
EXPOSE 5001

# Start backend
CMD ["npm", "run", "start"]
