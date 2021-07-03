FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y git clang curl libssl-dev llvm libudev-dev

ENV DEBIAN_FRONTEND="noninteractive" TZ="America/New_York"

SHELL ["/bin/bash", "-c"] 

RUN curl https://getsubstrate.io -sSf | bash -s -- --fast \ 
	&& source ~/.cargo/env \
	&& cargo install canvas-node --git https://github.com/paritytech/canvas-node.git --tag v0.1.5 --force --locked 

#CMD nohup canvas --dev --ws-external --rpc-external --prometheus-external &

EXPOSE 9944

