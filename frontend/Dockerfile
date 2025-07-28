# stage 1: Build
FROM node:18 AS build
WORKDIR /app 
COPY . .
RUN npm install 
RUN npm run build 

#stage 2: Serve Production build
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]