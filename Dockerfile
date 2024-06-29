FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_ENV=devel
ENV NODE_OPTIONS=--max-old-space-size=8192

CMD ["node", "src/app.js"]