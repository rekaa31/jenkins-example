FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependecies
RUN npm install

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 3060

CMD [ "node", "app.js" ]