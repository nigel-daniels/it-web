FROM alpine:latest

RUN apk update

RUN apk upgrade

RUN apk --no-progress --no-cache add autoconf automake make nasm gcc

RUN apk --no-progress --no-cache add libtool musl-dev zlib zlib-dev

RUN apk --no-progress --no-cache add nodejs git

CMD /bin/sh
