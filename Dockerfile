FROM node:iron-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM node:iron-alpine

# Create app directory
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

# Install app dependencies
COPY package*.json ./

RUN npm install --production 

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000

CMD [ "node", "dist/index.js" ]
