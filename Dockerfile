# etapa 1 imagen base
FROM node:10.16-alpine as base
WORKDIR /app

# etapa 2 compilacion
FROM base as build
RUN npm i typescript -g 
WORKDIR /dependencies
COPY ["package.json", "package-lock.json","tsconfig.json", "./"]
RUN npm install
WORKDIR /build
COPY ["package.json", "package-lock.json","tsconfig.json", "./"]
COPY ["./src", "./src"]
RUN npm install 
RUN tsc --build tsconfig.json

# etapa 3 despliegue
FROM base as deploy
WORKDIR /usr/app
COPY ./oas3.yaml .
COPY --from=build /dependencies .
COPY --from=build /build/dist .
EXPOSE 6500
CMD [ "npm","run","start" ]