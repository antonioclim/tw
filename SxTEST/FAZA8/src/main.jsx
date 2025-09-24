import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './ui/App.jsx'
import { store } from './store.js'
import './theme.css'
createRoot(document.getElementById('root')).render(<Provider store={store}><App/></Provider>)
