#!/usr/bin/env bash

# If you have Docker installed, uncomment the following. Otherwise, if Redis is not installed, please install it.
# docker run --name nabz-redis -p 6379:6379 -d redis:5-alpine

# Stop the Docker container.
# docker stop nabz-redis

# If you are running Docker and you have already run the command above, run this command each time you want to start the Redis container
# docker start nabz-redis
 
pushd ./api
npm run start
popd

pushd ./ui
npn run local
popd