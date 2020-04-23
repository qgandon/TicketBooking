FROM node:12

WORKDIR ./OrderMS

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
