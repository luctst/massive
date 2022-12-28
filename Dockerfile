FROM node:current-alpine3.15

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm fetch

ADD . ./

RUN pnpm install -r --offline

CMD pnpm run --filter api --filter client --if-present -r --stream dev
