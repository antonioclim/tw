import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './theme.css'
import App from './shell/App.jsx'
import Courses from './pages/Courses.jsx'
import Lesson from './pages/Lesson.jsx'
import About from './pages/About.jsx'

const router = createHashRouter([
  { path: '/', element: <App/>, children:[
    { index: true, element: <About/> },
    { path: 'courses', element: <Courses/> },
    { path: 'lesson/:id', element: <Lesson/> }
  ]}
], { future:{ v7_startTransition:true, v7_relativeSplatPath:true }})

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} future={{ v7_startTransition:true, v7_relativeSplatPath:true }}/>
)
