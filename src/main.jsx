import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { BeehiveApp } from './BeehiveApp'
import './css/Styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BeehiveApp />
    </BrowserRouter>
  </React.StrictMode>
)
