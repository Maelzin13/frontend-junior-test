FROM node:18 AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
COPY assets/users ./public/assets/users

EXPOSE 3000

CMD ["npm", "start"]


# RUN npm run build
# FROM nginx:alpine
# COPY --from=build /usr/src/app/build /usr/share/nginx/html

# # Configurar o Nginx
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
