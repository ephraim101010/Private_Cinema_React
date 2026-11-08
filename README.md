# Private Cinema — React

A cinematic, immersive dark-mode private cinema booking system built with **React**, **Vite**, and **Tailwind CSS**. Uses **Lucide React** for icons.

## Live Demo

Coming soon — run locally with `npm run dev`.

## Features

- **4-step booking flow:** Select Room → Schedule (Date & Time) → Guest Details → Confirmation
- **Room Types:** 5 rooms (Type A–E) with base pricing and dynamic hourly rates
- **Dynamic Pricing Engine:** Books 1–11 hours; if more than 3 hours, price = `floor(hours/3) × 3-hour rate + remainder rate`
- **Operating Hours:** Strictly 9:00 AM – 8:00 PM; start times auto-hide so end time never exceeds 8 PM
- **Neon Cinematic UI:** Dark slate background, cyan/blue glow accents, soft shadows, smooth transitions
- **Responsive:** Mobile-friendly grid layout with sidebar booking summary

## Tech Stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/)

## Project Structure

```
cinema-react-app/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   ├── logo.jpg
│   ├── typeA.jpg
│   ├── typeB.jpg
│   ├── typeC.jpg
│   ├── typeD.jpg
│   └── vite.svg
└── src/
    ├── main.jsx
    ├── index.css
    └── App.jsx
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Open `http://localhost:5174/` (or the port Vite reports).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Select Room:** Choose from Type A–E, each showing 1/2/3-hour base rates.
2. **Schedule:** Pick a duration (1–11 hours), select a date, then choose an available start time (capped so booking ends by 8 PM).
3. **Guest Details:** Enter Full Name and Phone Number; review the order summary.
4. **Confirm:** Submit to see the booking confirmation screen with all details.
5. **Book Another:** Reset and start over.

## Pricing

Base 3-hour rates:
- Type A: 45,000 Ks
- Type B: 40,000 Ks
- Type C: 34,000 Ks
- Type D: 27,000 Ks
- Type E: 21,000 Ks

For bookings over 3 hours: `floor(hours / 3) × 3-hour rate + rate for remaining hours (1 or 2)`.

Example: Type A, 4 hours = 45,000 + 16,000 = **61,000 Ks**

## License

MIT
