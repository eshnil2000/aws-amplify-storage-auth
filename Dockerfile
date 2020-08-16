#Build the image
#docker build -t aws-amplify .
#Run image, open port 3000, that's where node serves app
#docker run -it -p3000:3000 -v ~/.aws/:/root/.aws/  aws-amplify /bin/sh
#to save changes on local filesystem
#docker run -it -p3000:3000 -v ~/.aws/:/root/.aws/  -v $(pwd)/:/root/ aws-amplify /bin/sh

FROM node:lts-alpine
RUN npm install -g @aws-amplify/cli
RUN npm install -g create-react-app
RUN apk update
RUN apk add nano
RUN apk add git
COPY . /root/
WORKDIR /root
