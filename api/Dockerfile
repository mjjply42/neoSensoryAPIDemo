FROM node:13
WORKDIR /usr/app/
COPY ./package*.json /usr/app/api/
COPY . .
RUN npm install
RUN npm install react-scripts@3.0.1 
COPY . .
CMD ["npm", "start"]