FROM node:12

WORKDIR ./WebApp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083

CMD [ "npm", "start" ]