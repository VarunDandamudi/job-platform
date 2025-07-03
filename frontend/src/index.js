import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App';
    import { AuthProvider } from './context/AuthContext';
    import { MessageProvider } from './context/MessageContext';
    import './index.css'; // For general global styles (you'll add content to this later)

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageProvider> {/* Outer provider */}
        <AuthProvider> {/* Now safe to call useMessage() here */}
          <App />
        </AuthProvider>
      </MessageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
