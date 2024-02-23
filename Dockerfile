# Stage 1: Build the Astro frontend
FROM node:lts AS base
WORKDIR /app

COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install

COPY frontend/. .
RUN npm run build

# Stage 2: Build the Python backend API
FROM python:3.9 as backend-build
WORKDIR /backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .


#FROM base AS runtime
#COPY --from=prod-deps /app/node_modules ./node_modules
#COPY --from=build /app/dist ./dist
#COPY --from=backend-build /backend /backend

# Command to run the backend server
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node ./dist/server/entry.mjs", "python3 main.py"]
