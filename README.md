# SmartSubsidy AI - Hackathon MVP Let's Grow! 🌿

SmartSubsidy AI is a Smart Eligibility Guide, Auto-Form Filler, and Rejection Decoder designed to help farmers easily access agricultural benefits.

## Features
- **Smart Eligibility Engine**: Transparent rules logic determining eligible vs rejected schemes in plain English.
- **Mock AgriStack Integration**: Auto-fills applications dynamically without requiring user re-entry.
- **Rejection Decoder**: Turns bureaucratic denial statuses into clear explanations and alternative paths.
- **Premium Hackathon-Ready UI**: Designed with TailwindCSS using an earthy/green/glassmorphic palette.

## Project Structure
- `/backend`: Node.js + Express server hosting the core rules engine and mock DB API.
- `/frontend`: React + Vite client application handling UI and routing.

## How to Run Locally

### 1. Start the Backend
```powershell
cd backend
npm install
npm run dev
```
*(The backend runs on http://localhost:3000)*

### 2. Start the Frontend
Open a new terminal window:
```powershell
cd frontend
npm install
npm run dev
```
*(The frontend runs on http://localhost:5173)*

## How to Test the Demo
1. **Form Page**: Submit different inputs (e.g. land size `0.5` vs `2`) to see the Eligibility Engine adapt in real-time.
2. **Auto-Fill Application**: After finding matches, click the "Auto-Fill" button to see the mock e-KYC and AgriStack data populated dynamically.
3. **Rejection Decoder**: Head to the "Track Status" page and enter `APP-9101` to view a decoded rejection response in plain English. Try `APP-1234` for a successful one.

Built for the Hackathon!
