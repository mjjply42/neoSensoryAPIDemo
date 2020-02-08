FROM node:13
WORKDIR /usr/app/
COPY ./package*.json /usr/app/
COPY . .
RUN npm install 
COPY . .
CMD ["npm", "start"]