FROM node:16 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build --omit="dev" --localize

FROM nginx:1.23.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/registry-ui /usr/share/nginx/html
