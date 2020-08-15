FROM node:lts-alpine
RUN npm install -g @aws-amplify/cli
RUN npm install -g create-react-app
RUN apk add nano
