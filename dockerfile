FROM node:14-alpine as base
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install


FROM node:14-alpine as dev
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]


FROM base as pre-prod
COPY . .
RUN npm ci
RUN npm run build


FROM node:14-alpine as prod
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY --from=pre-prod /usr/app/node_modules ./node_modules
COPY --from=pre-prod /usr/app/package.json ./package.json
COPY --from=pre-prod /usr/app/.next ./.next
COPY --from=pre-prod /usr/app/next.config.js ./next.config.js
COPY --from=pre-prod /usr/app/postcss.config.js ./postcss.config.js
COPY --from=pre-prod /usr/app/tailwind.config.js ./tailwind.config.js

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]


# FROM node:16-alpine AS builder
# RUN mkdir -p /usr/app
# WORKDIR /usr/app
# COPY ./ ./


# RUN npm install 
# RUN npm run build
# RUN rm -rf node_modules
# RUN npm install --production

# FROM node:16-alpine
# ENV NODE_ENV production
# RUN mkdir -p /usr/app
# WORKDIR /usr/app
# COPY --from=builder /usr/app/node_modules ./node_modules
# COPY --from=builder /usr/app/package.json ./package.json
# COPY --from=builder /usr/app/.next ./.next
# COPY --from=builder /usr/app/next.config.js ./next.config.js
# COPY --from=builder /usr/app/postcss.config.js ./postcss.config.js
# COPY --from=builder /usr/app/tailwind.config.js ./tailwind.config.js
# EXPOSE 3000

# CMD ["npm", "start"]