# Base image
FROM node:18-alpine

# Create api directory
WORKDIR /usr/src/api

# Setup environment variables
ENV PORT 3000

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

# Expose ports api runs on
EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]