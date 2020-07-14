FROM node:12-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY angular.json browserslist karma.conf.js tsconfig* ./
COPY e2e e2e/
COPY src src/


RUN npm run build-prod

FROM node:12-alpine

RUN npm install -g serve

COPY --from=builder /app/dist/regEz /app

EXPOSE 9000

ENTRYPOINT ["serve", "app","-p","9000"]


