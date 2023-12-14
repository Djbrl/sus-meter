# Use a base image with the necessary runtime (e.g., Node.js)
FROM node:18-alpine

RUN mkdir /backend

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .


# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
