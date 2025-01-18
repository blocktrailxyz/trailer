# Use the Node.js base image
FROM node:23.1.0

# Use environment variables in production
ENV NODE_ENV production
ENV APP_PORT 8080

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Define the command to run your application
CMD ["npm", "run", "start"]
