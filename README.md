# Ambrosia application

This repository contains a Docker compose file which can be used to easily spin up an instance.


## Running

To run in detached mode, execute this command:
1. `$ docker-compose up -d`

2. There should now be two servers running:
  - [http://127.0.0.1:9944](http://127.0.0.1:9944) is the canvas node
  - [http://127.0.0.1:80](http://127.0.0.1:80) is the front-end app