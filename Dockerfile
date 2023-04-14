FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm i --legacy-peer-deps
RUN npm run build:prod

FROM nginx:1.15
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
