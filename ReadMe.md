# Initiate Thinking Web Demo

This project is a Node/Express server that serves a Backbone/React client.  It functions as a basic app template but with rich ready to go features. From [Initiate Thinking](https://www.initiatethinking.com).

## Generating SSL Keys
The key and certificate referenced were generated using the following pair of commands from within the config directory:

```
openssl req -newkey rsa:2048 -new -nodes -keyout it-test-key.pem -out it-test-csr.pem
openssl x509 -req -days 365 -in it-test-csr.pem -signkey it-test-key.pem -out it-test-crt.crt
```

## Setting up for email
You will need to edit the file `config/mail.bak.js` to use your own email credentials, then save the file as `config/mail.js`.
