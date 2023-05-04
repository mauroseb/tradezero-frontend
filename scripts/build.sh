#!/bin/bash
NAME=tradezero-frontend
VERSION=0.1.0
PODMAN_ARGS="--layers=false"

podman build ${PODMAN_ARGS} --build-arg=IMAGE_VERSION=${VERSION} \
             --build-arg=IMAGE_CREATE_DATE=`date +%F` \
             --build-arg=IMAGE_CREATE_COMMIT=`git rev-parse --short HEAD`\
             -t ${NAME}:${VERSION} .

