import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';

import { ThemeProvider } from "./context/ThemeContext.js";

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
