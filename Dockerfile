FROM node:12.16.0

RUN mkdir -p /home/node/app && \
  chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]
