# Architecture Documentation

## Project Overview

**Vietlott Checker** is a React-based web application for checking Vietnamese lottery (Vietlott) results. The application allows users to select a date and lottery type (Mega 6/55 or Power 6/45) to check lottery results.

## Technology Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.1
- **Language**: JavaScript (JSX)
- **Package Manager**: npm

## Project Structure

```
vietlott-checker/
├── src/
│   ├── components/
│   │   ├── VietlottForm.jsx      # Main form component
│   │   └── VietlottForm.css      # Form component styles
│   ├── App.jsx                    # Root application component
│   ├── App.css                    # Application-level styles
│   └── main.jsx                   # Application entry point
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── vite.config.js                 # Vite configuration
└── .gitignore                     # Git ignore rules
```

## Architecture Layers

### 1. Entry Point Layer
- **[main.jsx](src/main.jsx)**: Application bootstrap
  - Initializes React root
  - Wraps app in StrictMode for development warnings
  - Mounts the application to DOM

### 2. Application Layer
- **[App.jsx](src/App.jsx)**: Root component
  - Serves as the main container
  - Imports and renders the VietlottForm component
  - Applies global application styles

### 3. Component Layer
- **[VietlottForm.jsx](src/components/VietlottForm.jsx)**: Main feature component
  - Manages form state using React hooks
  - Handles user interactions (date selection, lottery type selection)
  - Processes form submission and reset logic

## Component Details

### VietlottForm Component

**State Management**:
- `selectedDate`: Stores the selected lottery draw date
- `selectedLottery`: Stores the lottery type ('655' for Mega 6/55, '645' for Power 6/45)

**Key Features**:
- Date picker for selecting lottery draw date
- Radio buttons for lottery type selection (Mega 6/55 or Power 6/45)
- Form validation (date is required)
- Submit handler for checking results
- Reset functionality to clear form

**Event Handlers**:
- `handleSubmit`: Processes form submission and displays selected data
- `handleReset`: Resets form to initial state

## Design Patterns

### Component-Based Architecture
- Separation of concerns with dedicated components
- Reusable component structure
- CSS modules for component-specific styling

### State Management
- Local component state using React hooks (`useState`)
- Controlled form inputs for predictable data flow

### Form Handling
- Native HTML5 validation
- Controlled components pattern
- Event-driven interactions

## Development Workflow

### Development Server
```bash
npm run dev
```
Starts Vite development server with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Creates optimized production bundle in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## Future Architecture Considerations

### Recommended Enhancements

1. **API Integration Layer**
   - Create service modules for lottery data fetching
   - Implement API client with error handling
   - Add data caching mechanism

2. **State Management**
   - Consider Context API for global state (if complexity grows)
   - Implement Redux/Zustand for complex state scenarios

3. **Routing**
   - Add React Router for multi-page navigation
   - Implement separate pages for results, history, etc.

4. **Data Layer**
   - Create data models for lottery results
   - Implement local storage for user preferences
   - Add result caching strategy

5. **Testing Infrastructure**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright/Cypress

6. **Performance Optimization**
   - Code splitting for larger components
   - Lazy loading for routes
   - Memoization for expensive computations

## Browser Compatibility

The application uses modern JavaScript (ES6+) and React 18 features. It should be compatible with:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Build Configuration

### Vite Configuration
- React plugin enabled for JSX transformation
- Fast refresh for development
- Optimized bundling for production

## Security Considerations

- Input validation on form fields
- No sensitive data storage (currently)
- CSP headers should be configured in production deployment
- HTTPS recommended for production

## Performance Metrics

Current application is lightweight:
- Small bundle size (React + minimal dependencies)
- Fast initial load time
- Instant UI interactions (no API calls yet)

## Deployment

The application can be deployed to:
- Static hosting services (Netlify, Vercel, GitHub Pages)
- CDN platforms
- Traditional web servers (nginx, Apache)

Build output is in `dist/` directory after running `npm run build`.
