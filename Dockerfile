# Stage 1: Build the Astro frontend
FROM node:latest as frontend-build
WORKDIR /app
# Assuming the frontend code is in a directory named 'frontend' at the root of your repository
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build the Python backend API
FROM python:3.9 as backend-build
WORKDIR /backend
# Copy the backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
# Copy the backend application code
COPY backend/ .
# Now, copy the built frontend into the backend's static files directory
# This assumes your backend is configured to serve static files from a directory named 'static'
# You might need to adjust the path based on your backend's configuration
COPY --from=frontend-build /app/dist /backend/static

# Expose the port the backend listens on
EXPOSE 8000

# Command to run the backend server
# Ensure this command correctly starts your backend application
CMD ["python", "app.py"]
