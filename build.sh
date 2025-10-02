#!/bin/bash

# FofoDashboard Build Script
# This script builds the application for deployment

set -e  # Exit on any error

echo "🔨 Building FofoDashboard..."

# Install Python dependencies for backend
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies and build frontend
echo "📦 Installing Node.js dependencies and building frontend..."
cd webapp
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
