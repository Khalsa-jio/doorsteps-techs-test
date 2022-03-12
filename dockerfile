FROM node:14 as dependencies

WORKDIR /doorsteps-tech-test

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:14 as builder
WORKDIR /doorsteps-tech-test
COPY . .
COPY --from=dependencies /doorsteps-tech-test/node_modules ./node_modules
RUN yarn build


FROM node:14 as runner
WORKDIR /doorsteps-tech-test
ENV NODE_ENV production


COPY --from=builder /doorsteps-tech-test/node_modules ./node_modules
COPY --from=builder /doorsteps-tech-test/package.json ./package.json


EXPOSE 3000
CMD ["yarn", "start"]