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


#############

# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the application's port
EXPOSE 5050

# Start the backend server
CMD ["npm", "start"]



FROM jenkins/jenkins:lts-jdk17

USER root

# Install dependencies for Docker and Docker Compose
RUN apt-get update && apt-get install -y \
    curl \
    lsb-release \
    python3-pip \
    python3-setuptools \
    ca-certificates \
    gnupg \
    jq

# Install Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

USER jenkins
