FROM node:12.16.1-stretch

RUN mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --only=prod

COPY . .

USER node

EXPOSE 3000

CMD [ "yarn", "start" ]
