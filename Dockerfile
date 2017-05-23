FROM it-base:latest

RUN adduser -g users -D ituser

USER ituser

WORKDIR /home/ituser/

COPY package.json .

RUN npm install

RUN mkdir -p public/js

WORKDIR /home/ituser/it-web/public/js/

COPY public/js/bower.json .

RUN bower install --allow-root

WORKDIR /home/ituser/it-web

VOLUME /home/ituser/it-web

CMD /bin/sh
