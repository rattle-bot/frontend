FROM node:23-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD sh -c "http-server dist --spa -p 3000 -a 0.0.0.0"