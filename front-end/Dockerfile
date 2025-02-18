FROM node:latest

WORKDIR /App

COPY package*.json ./

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "dist", "-l", "5000"]

EXPOSE 5000