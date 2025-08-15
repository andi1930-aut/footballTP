import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Service Worker für PWA registrieren
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();
