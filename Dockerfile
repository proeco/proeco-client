FROM node:19.9.0

RUN mkdir /client

WORKDIR /client
COPY . /client

RUN yarn install

EXPOSE 3000
CMD sh -c "yarn && yarn start"
