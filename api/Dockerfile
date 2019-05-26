# Dockerfile for the API app
FROM node:10-alpine
WORKDIR "/var/www/app"
EXPOSE 3000

COPY package*.json ./

RUN npm rebuild && npm install

ENV PATH /var/www/app/node_modules/.bin:$PATH

CMD [ "npm", "run", "start" ]