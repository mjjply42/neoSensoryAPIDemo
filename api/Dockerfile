FROM node:13
WORKDIR /usr/app/
COPY ./package*.json /usr/app/api/
COPY . .
RUN npm install 
COPY . .
CMD ["npm", "start"]