FROM node:lts-bullseye-slim

WORKDIR /home/node/app

COPY ./wait-for.sh /root/wait-for.sh

RUN chmod +x /root/wait-for.sh

CMD /root/wait-for.sh mobile:8082 -t 600 -- cp build/client.apk public/client.apk && yarn install && yarn start