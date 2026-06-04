import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainContextProvider from './Context/CaptainContext.jsx'



createRoot(document.getElementById('root')).render(
  <>
    <CaptainContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CaptainContextProvider>
  </>,
)
