# # Use the Node.js base image directly (node:18-alpine is lightweight and recommended)
# FROM node:18-alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json first to leverage Docker's caching
# COPY client/package.json client/package-lock.json ./client/

# #Set the new working directory
# WORKDIR /app/client/

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY client/. /app/client

# # Expose the Vite default development server port
# EXPOSE 5173

# # Run the development server

# CMD ["npm", "run", "dev","--","--host"]


#######

# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the application's port
EXPOSE 5050

# Start the backend server
CMD ["npm", "start"]

