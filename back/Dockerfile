FROM node:14

WORKDIR /usr/src/stock-back

COPY package.json yarn.lock ./

COPY . ./

EXPOSE 3000
EXPOSE 9200

CMD yarn run start