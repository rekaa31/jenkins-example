FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependecies
RUN npm install
RUN npm install -g sequelize-cli

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 3020

CMD [ "node", "app.js" ]