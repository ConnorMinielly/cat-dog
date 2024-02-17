FROM node:21

ENV NODE_ENV production

WORKDIR /cat-dog

COPY . .

RUN npm install

RUN npm run build

RUN npm install pm2 -g

CMD ["pm2-runtime", "process.yml"]

EXPOSE 5000