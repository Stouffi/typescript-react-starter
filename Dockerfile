FROM nginx:stable-alpine

RUN apk add --update coreutils

RUN apk add --no-cache nodejs yarn

RUN yarn global add @beam-australia/react-env

ADD nginx.conf /etc/nginx/nginx.conf.template

ADD entrypoint.sh /var/entrypoint.sh

ENTRYPOINT ["/var/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

WORKDIR /var/www

ADD dist /var/www

COPY .env* /var/www/
