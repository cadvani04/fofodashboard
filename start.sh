#!/bin/bash

# FofoDashboard Deployment Script
# This script sets up and starts both the FastAPI backend and Next.js frontend

set -e  # Exit on any error

echo "🚀 Starting FofoDashboard deployment..."

# Install Python dependencies for backend
echo "📦 Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install Node.js dependencies and build frontend
echo "📦 Installing Node.js dependencies and building frontend..."
cd webapp
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"

# Start the applications
echo "🌟 Starting applications..."

# Start FastAPI backend in background
echo "🔧 Starting FastAPI backend on port 8000..."
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Start Next.js frontend
echo "🎨 Starting Next.js frontend on port 3000..."
cd webapp
npm start &
FRONTEND_PID=$!
cd ..

echo "🎉 Both applications are now running!"
echo "📍 Backend API: http://localhost:8000"
echo "📍 Frontend: http://localhost:3000"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
