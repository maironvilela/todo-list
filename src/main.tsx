import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DialogProvider } from './context/dialog.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DialogProvider>
        <App />
    </DialogProvider>
);
