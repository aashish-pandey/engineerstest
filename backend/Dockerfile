# use node.js as base
FROM node:18

# create app directory
WORKDIR /app

# copy package files and install dependencies
COPY package*.json ./
RUN npm install

# copy all app files
COPY . .

# expose the app port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]

