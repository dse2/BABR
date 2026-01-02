
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Injecting global styles for the white theme
const style = document.createElement('style');
style.textContent = `
  :root {
    --brand-white: #ffffff;
    --brand-gray: #666666;
    --bg-color: #ffffff;
    --text-color: #000000;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .barber-pole-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::selection {
    background: black;
    color: white;
  }
`;
document.head.appendChild(style);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
  const root = createRoot(rootDiv);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
