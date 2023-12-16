# Use a base image with the necessary runtime (e.g., Node.js)
FROM node:18-alpine

RUN mkdir /frontend

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ARG VUE_APP_BACKEND_IP
# ARG VUE_APP_BACKEND_HOST_PORT
ENV VUE_APP_BACKEND_IP=${VUE_APP_BACKEND_IP}
# ENV VUE_APP_BACKEND_HOST_PORT=${VUE_APP_BACKEND_HOST_PORT}

# Expose the port your app will run on
EXPOSE 8080

# Command to run your application
CMD ["npm", "run", "serve"]
