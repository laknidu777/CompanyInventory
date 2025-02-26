# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
