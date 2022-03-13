FROM node:16-alpine

RUN mkdir -p /usr/app/studio

WORKDIR /usr/app/studio
COPY package.json ./
RUN npm install --quiet
COPY . .
EXPOSE 3333 

CMD ["sanity", "start"]