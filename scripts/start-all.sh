#!/bin/bash
# Simple concurrency for local dev
trap 'kill %1; kill %2' SIGINT
echo "Starting Backend on :3001..."
(cd backend && npm run dev) &
echo "Starting Frontend on :5173..."
(cd frontend && npm run dev) &
wait
