FROM node:4.3.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
