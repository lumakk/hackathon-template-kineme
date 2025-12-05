#!/bin/bash
echo "Installing Dependencies..."

# Check node
if ! command -v node &> /dev/null; then
    echo "Node not found. Please run: sudo dnf install nodejs"
    exit 1
fi

echo "Installing Frontend Deps..."
cd frontend && npm install
cd ..

echo "Installing Backend Deps..."
cd backend && npm install
cd ..

echo "Setup Complete. Run ./scripts/start-all.sh to begin."
