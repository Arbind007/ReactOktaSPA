FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]




# docker build -t spaokta .
# docker run --name ReactOIDC -p 3000:3000 -d spaokta  
