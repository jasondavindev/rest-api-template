FROM node:12.16.1-stretch

RUN mkdir /app && \
  chown -R node:node /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --prod

COPY . .

USER node

EXPOSE 3000

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

CMD [ "yarn", "start" ]
