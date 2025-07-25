# Use Node.js base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy backend code only for now
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install

# Copy the rest of the backend code
COPY backend ./backend

# Set working directory to backend folder
WORKDIR /app/backend

# Expose the port your backend runs on (update if not 3000)
EXPOSE 3000

# Start backend
CMD ["node", "app.js"]
