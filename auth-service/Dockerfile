FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8001

CMD ["yarn", "start:dev"]
