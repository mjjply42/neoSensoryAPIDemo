FROM node:13
WORKDIR /usr/app/
COPY ./package*.json /usr/app/client/
COPY . .
RUN npm install
RUN npm install react-scripts
COPY . .
CMD ["npm", "start"]