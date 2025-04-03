FROM node
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install \
    && npm run build-prod \
    && npm run serve-prod
COPY . /app
EXPOSE 4200
CMD ["npm", "start"]
