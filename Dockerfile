FROM node:23-alpine

ARG VITE_PUBLIC_API_HOST
ENV VITE_PUBLIC_API_HOST=${VITE_PUBLIC_API_HOST}

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD sh -c "http-server dist --proxy http://localhost:${PORT}? --spa"