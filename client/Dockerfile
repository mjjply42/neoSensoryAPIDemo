FROM node:13
WORKDIR /usr/app/
ADD package.json /src/package.json
RUN npm install
COPY . .
CMD ["npm", "start"]