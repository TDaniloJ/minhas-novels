import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// define o lang da tag <html> baseado no .env
document.documentElement.lang =
  import.meta.env.VITE_SITE_LANGUAGE || "en";

// define também o título da aba pelo .env
document.title = import.meta.env.VITE_SITE_NAME || "Frontend";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)