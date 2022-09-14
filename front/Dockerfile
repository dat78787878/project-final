FROM node:16.15.0-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
CMD ["nx", "serve", "admin"]
