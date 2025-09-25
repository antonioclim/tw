import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './theme.css'
import App from './App.jsx'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}><App/></Provider>
)
