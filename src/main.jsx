// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Remove inline hiding that might be present in index.html to prevent FOUC.
// Runs after the CSS has loaded and before the app mounts.
if (typeof document !== 'undefined') {
  // Wait one RAF to ensure CSS parsed and DOM ready
  window.requestAnimationFrame(() => {
    try {
      const els = document.querySelectorAll('.bg-aqua-band, .bg-dots, .bg-crystals, .bg-grain, .bg-animated-gradient, .bg-particles, .bg-glints, .bg-noise');
      els.forEach(el => {
        // If an inline opacity was added to hide FOUC in index.html, remove it
        if (el.style && el.style.opacity) {
          el.style.transition = 'opacity 420ms ease';
          // set to 1 so they fade in smoothly
          el.style.opacity = '1';
          // also remove attribute after a short delay to let CSS fully control it
          setTimeout(() => {
            el.style.transition = '';
            el.style.opacity = '';
          }, 520);
        } else {
          // ensure they are visible if not explicitly hidden
          el.style.opacity = '1';
        }
      });
    } catch (err) {
      // non-fatal — don't break the app if querySelectorAll fails
      // console.debug('bg fade-in failed', err);
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
