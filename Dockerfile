FROM node:lts-alpine

# setup curl for healthcheck
RUN apk --no-cache add curl

# Create app directory
WORKDIR /app

# Install all app dependencies
ADD package*.json ./
RUN npm ci

# Bundle app source
COPY . .
RUN npm run build && npm ci --production

EXPOSE 4000
CMD ["node", "dist/index.js"]
