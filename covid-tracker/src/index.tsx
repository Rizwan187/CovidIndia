// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import App from './App'; // Adjust the path if necessary
import store from './store/store'; // Adjust the path if necessary

const rootElement = document.getElementById('root'); // Get the root element
const root = createRoot(rootElement!); // Create a root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
