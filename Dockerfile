# Stage 1: Build the Astro frontend
FROM node:latest as frontend-build
WORKDIR /app
# Copying frontend dependencies and installing them
COPY frontend/package*.json ./
RUN npm install
# Copying the rest of the frontend app and building it
COPY frontend/ .
RUN npm run build

# Stage 2: Build the Python backend API
FROM python:3.9 as backend-build
WORKDIR /backend
# Copying backend dependencies and installing them
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
# Copying the backend app
COPY backend/ .
# Copying the built frontend app to the backend static folder
COPY --from=frontend-build /app/dist /backend/static

# Exposing the port the backend listens on
EXPOSE 8000

# Command to run the backend server
CMD ["python3", "main.py"]
