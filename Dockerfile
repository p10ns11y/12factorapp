FROM node:8-alpine
WORKDIR /src
COPY . .
RUN yarn install --production
CMD [ "node", "dockerBuildReleaseRun.js" ]