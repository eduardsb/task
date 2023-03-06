FROM node:14-alpine

WORKDIR /

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
