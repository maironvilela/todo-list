import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DialogProvider } from './context/dialog.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DialogProvider>
            <App />
        </DialogProvider>
    </React.StrictMode>
);
