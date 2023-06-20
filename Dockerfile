# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 5000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]
FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk update && apk add --no-cache bash
RUN npm install --production --silent && mv node_modules ../

# Copy application code
COPY . .

EXPOSE 5000

RUN chown -R node /usr/src/app
USER node

CMD ["npm", "start"]
