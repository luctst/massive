# path: ./Dockerfile

# FROM node:14-alpine
# # Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
# ARG NODE_ENV=staging
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /opt/
# COPY ./package.json ./yarn.lock ./
# ENV PATH /opt/node_modules/.bin:$PATH
# RUN yarn config set network-timeout 600000 -g && yarn install
# WORKDIR /opt/app
# COPY ./ .
# CMD NODE_OPTIONS=--max_old_space_size=4096 yarn build && yarn start


FROM node:16-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install --production
WORKDIR /opt/app
COPY ./ .
FROM node:16-alpine
CMD ["yarn", "build"]

FROM node:16-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules
ENV PATH /opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
CMD NODE_OPTIONS=--max_old_space_size=4096 yarn build --no-optimization && yarn start
