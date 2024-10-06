FROM node:22.9.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY ./src ./src

ENV NODE_ENV=production
ENV PORT=8080
ENV MONGODB_URI=mongodb+srv://fahadashraf9612:JN2FfuxlLjogDnfG@cluster0.v5nfpvl.mongodb.net/liviin_db?retryWrites=true&w=majority&appName=Cluster0

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD npm run start
