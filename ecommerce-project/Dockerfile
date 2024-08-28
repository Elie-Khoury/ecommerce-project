FROM node:20-alpine as build-stage

WORKDIR /src/app

COPY package*.json /src/app

RUN npm install

COPY . /src/app

RUN npm run build

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]