    FROM node:8

    WORKDIR /usr/src/app
    COPY . .
    RUN npm install

    CMD ["node", "/usr/src/app/run.js"]
