FROM node:12

WORKDIR ./UserMS

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD [ "npm", "start" ]
