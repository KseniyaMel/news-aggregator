FROM node:18-alpine as build
ARG SERVER_URL
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY *.json *.lock ./
RUN npm i react-scripts@latest
COPY . .
EXPOSE 3000
CMD ["npm", "start"]