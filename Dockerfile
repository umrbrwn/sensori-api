FROM node:18-alpine
WORKDIR /usr/src/api
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN ["chmod", "+x", "./docker-entrypoint.sh"]
ENTRYPOINT ["./docker-entrypoint.sh"]
EXPOSE 3000
