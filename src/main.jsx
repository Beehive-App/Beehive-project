import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { BeehiveApp } from './BeehiveApp'
import { store } from './store/store';
import './css/Styles.css'
import { esES, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
          <BeehiveApp />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
