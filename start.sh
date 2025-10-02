#!/bin/bash

# FofoDashboard Start Script
# This script starts both the FastAPI backend and Next.js frontend

set -e  # Exit on any error

echo "🚀 Starting FofoDashboard applications..."

# Get the PORT from environment variable (Railway sets this)
PORT=${PORT:-3000}
BACKEND_PORT=${BACKEND_PORT:-8000}

echo "🔧 Starting FastAPI backend on port $BACKEND_PORT..."
cd backend
uvicorn main:app --host 0.0.0.0 --port $BACKEND_PORT &
BACKEND_PID=$!
cd ..

echo "🎨 Starting Next.js frontend on port $PORT..."
cd webapp
PORT=$PORT npm start &
FRONTEND_PID=$!
cd ..

echo "🎉 Both applications are now running!"
echo "📍 Backend API: http://localhost:$BACKEND_PORT"
echo "📍 Frontend: http://localhost:$PORT"

# Function to handle shutdown
cleanup() {
    echo "🛑 Shutting down applications..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
