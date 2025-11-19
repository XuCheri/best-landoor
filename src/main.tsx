import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { SpeechProvider } from './contexts/SpeechContext';

// Import fonts as specified in the README's design system
import '@fontsource/exo-2/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

// Import global styles
import './index.css';

// Import the main App component
import App from './App';

const container = document.getElementById('root')!;

// Clear the container on HMR re-run to avoid error
container.innerHTML = '';

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <SpeechProvider key={Date.now()}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SpeechProvider>
  </React.StrictMode>,
);
