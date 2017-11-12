FROM it-base:latest

RUN mkdir /usr/local/it-web

WORKDIR /usr/local/it-web

COPY package.json .

RUN npm install

RUN mkdir -p client/js

WORKDIR /usr/local/it-web/client/js

COPY client/js/package.json /usr/local/it-web/client/js

RUN npm install

RUN npm -g install nodemon

WORKDIR /usr/local/it-web

VOLUME /usr/local/it-web

CMD /bin/bash
