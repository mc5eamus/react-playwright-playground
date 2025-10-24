# react-playwright-playground

A full-stack application with React + Vite frontend and Node.js backend.

## Project Structure

- `frontend/` - React application with Vite and TypeScript
- `backend/` - Node.js Express API server with TypeScript

## Features

- ⚛️ React 19 with TypeScript
- ⚡ Vite for fast development
- 🎯 Counter button interface
- 🔌 Express.js backend API
- 📊 API integration with example data

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

## Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend app will run on `http://localhost:5173`

## API Endpoints

- `GET /api/data` - Get all example data
- `GET /api/data/:id` - Get specific item by ID
- `GET /health` - Health check endpoint

## Development

1. Start the backend server first:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```
