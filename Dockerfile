FROM node:16-alpine


WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

# RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
