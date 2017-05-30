FROM it-base:latest

RUN mkdir /usr/local/it-web

WORKDIR /usr/local/it-web

COPY package.json .

RUN npm install

RUN mkdir -p public/js

WORKDIR /usr/local/it-web/public/js

COPY public/js/package.json /usr/local/it-web/public/js

RUN npm install

RUN npm -g install nodemon

WORKDIR /usr/local/it-web

VOLUME /usr/local/it-web

CMD /bin/bash
