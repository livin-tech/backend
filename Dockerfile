FROM node:22.9.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY ./src ./src

COPY ./tsup.config.ts ./tsup.config.ts

ENV NODE_ENV=production
ENV PORT=8080
ENV MONGODB_URI=mongodb+srv://liviin-tech:JiQ1wob1mCJ8CuRL@liviin.s57dt.mongodb.net/test?retryWrites=true&w=majority&appName=liviin

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
