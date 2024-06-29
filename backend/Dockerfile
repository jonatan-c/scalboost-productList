# backend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

# Agregar esta línea para verificar la versión de Node.js
RUN node -v

CMD ["npm", "run", "start"]
