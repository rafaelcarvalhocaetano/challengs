FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/

RUN rm /usr/share/nginx/html/index.html
COPY index.html /usr/share/nginx/html/

CMD [ "nginx", "-g", "daemon off;" ]