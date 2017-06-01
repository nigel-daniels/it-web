# Mongo
This is the stock Mongo image.

## Run
Create a folder named data in this directory to persist the docker data from run to run.

```
docker run --name mongo --network=bridge -p 27017:27017 -v ~/git/it-web/docker/mongo/data:/data/db -d mongo:latest
```
