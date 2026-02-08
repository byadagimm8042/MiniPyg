# MiniPyg Landing Page

A modern React landing page for MiniPyg — Duolingo for Money. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🎨 **Modern Dark Theme**: Beautiful gradient backgrounds and glassmorphism effects
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **React + TypeScript**: Type-safe, modern React application
- 🎯 **Interactive Forms**: Pilot signup and pricing validation forms
- 💡 **Modal System**: Fake checkout modal for pricing tests
- 🚀 **Fast Build**: Optimized with Vite for lightning-fast development

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Deployment

Your app is ready to deploy! The built files are in the `dist` folder.

### Quick Deploy Options:

1. **Netlify Drop** (Easiest): Drag and drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
2. **Vercel**: Connect your repo or drag and drop to [vercel.com](https://vercel.com)
3. **Netlify**: Manual deploy via [netlify.com](https://www.netlify.com)

See `DEPLOY.md` for detailed deployment instructions.

## Project Structure

```
├── src/
│   ├── App.tsx          # Main React component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── dist/                # Production build (generated)
```

## Features Overview

- **Hero Section**: Main value proposition with key benefits
- **Pilot Signup Form**: 14-day habit pilot commitment form
- **Pricing Section**: Three pricing tiers with fake checkout
- **Modal System**: Interactive modal for early access reservations

## License

This project is open source and available for use.
