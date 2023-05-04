# Tradezero Frontend Containerfile
# Global arguments passed to all stages
ARG IMAGE_CREATE_DATE
ARG IMAGE_VERSION
ARG IMAGE_VERSION_COMMIT
#ARG NODE_ENV=production
ARG NODE_ENV=development

###########################################
# Use nodejs UBI base image for first stage
###########################################
FROM registry.access.redhat.com/ubi8/nodejs-16 AS builder

ENV USER_ID=1001 \
	APP=tradezero-frontend \
    NODE_ENV=$NODE_ENV \
    TZF_VERSION=$IMAGE_VERSION \
    TZF_COMMIT=$IMAGE_VERSION_COMMIT$

LABEL maintainer="mauro.oddi@gmail.com" name="$APP" build-date=$IMAGE_CREATE_DATE version=$IMAGE_VERSION

USER 0

# Add code where s2i assemble script expects it
ADD src /tmp/src

RUN  chown -R ${USER_ID}:0 /tmp/src

# Install the dependencies
RUN /usr/libexec/s2i/assemble

###########################################
# Second stage with UBI8 minimal
###########################################

FROM registry.access.redhat.com/ubi8/nodejs-16-minimal

ENV USER_ID=1001 \
	APP=tradezero-frontend \
    NODE_ENV=$NODE_ENV \
    WEB_PORT=8000 \
    TZF_PORT=8000 \
    TZF_HOME=/opt/app-root/src \
    TZF_VERSION=$IMAGE_VERSION \
    TZF_COMMIT=$IMAGE_VERSION_COMMIT$ \
    SUMMARY="TradeZero Frontend microservice for the Tradezero application."

LABEL maintainer="mauro.oddi@gmail.com" name="$APP" build-date=$IMAGE_CREATE_DATE version=$IMAGE_VERSION

# k8s, OCP and other labels [ https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/images/creating-images#defining-image-metadata ]
LABEL summary="$SUMMARY" \
	  usage="podman run -d --name tradezero-frontend-1 -e TZP_HOST=192.168.0.1 -e TZM_HOST=192.168.0.2 -p 8000:8000 tradezero-frontend:0.1.0" \
      commit="$IMAGE_VERSION_COMMIT" \
	  io.k8s.description="$SUMMARY" io.k8s.display-name="$APP" \
	  io.openshift.non-scalable="false" io.openshift.tags="$APP"

# OCI Image Spec Labels [ https://github.com/opencontainers/image-spec/blob/master/annotations.md ]
LABEL org.opencontainers.image.title="TradeZero - Frontend" \
      org.opencontainers.image.description="TradeZero Frontend Microservice." \
      org.opencontainers.image.authors="Mauro S. Oddi" \
      org.opencontainers.image.created=$IMAGE_CREATE_DATE \
      org.opencontainers.image.version=$IMAGE_VERSION \
      org.opencontainers.image.url="https://github.com/mauroseb/tradezero-frontend/Containerfile" \
      org.opencontainers.image.source="https://github.com/mauroseb/tradezero-frontend.git" \
      org.opencontainers.image.vendor="Up and Running with Red Hat Openshift" \
      org.opencontainers.image.licenses="MIT"

COPY --from=builder $TZF_HOME $TZF_HOME

EXPOSE $TZF_PORT

# Run using s2i script
CMD /usr/libexec/s2i/run
