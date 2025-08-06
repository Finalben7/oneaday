import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supabaseClient' // Make sure you're importing your initialized client
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)