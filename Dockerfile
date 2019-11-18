FROM node:11.4-alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN echo $NODE_ENV

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install \
    && rm -rf dist/ \
    && npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
