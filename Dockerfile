FROM node:20.16.0
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN npm run build-prod
RUN npm run serve-prod
#CMD ["npm", "start"]
