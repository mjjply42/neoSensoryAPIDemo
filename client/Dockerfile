FROM node:13
WORKDIR /usr/app/
COPY ./package*.json /usr/app/client/
COPY ./yarn.lock /usr/app/client/
COPY ./public /usr/app/client/
COPY ./src /usr/app/client/
COPY . .
RUN npm install 
COPY . .
CMD ["npm", "start"]