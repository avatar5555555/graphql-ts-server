FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install all app dependencies
ADD package*.json ./
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 4000
CMD ["npm", "start"]
