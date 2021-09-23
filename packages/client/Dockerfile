FROM node:14.15.0

RUN mkdir /client

WORKDIR /client
COPY . /client

RUN yarn install

EXPOSE 3000
CMD sh -c "npx lerna bootstrap && yarn start"
