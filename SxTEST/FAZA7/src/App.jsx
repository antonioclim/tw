import React, { Suspense, lazy } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const Courses = lazy(()=> import('./pages/Courses.jsx'))
const Lessons = lazy(()=> import('./pages/Lessons.jsx'))

function Home(){
  return <p>Bine ai venit! React local, fără CDN/inline. API via proxy: <code>/api/*</code></p>
}

const router = createHashRouter(
  [
    { path: '/', element: <Home/> },
    { path: '/courses', element: <Courses/> },
    { path: '/course/:id', element: <Lessons/> }
  ],
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
)

export default function App(){
  return (
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      fallbackElement={<p>Se încarcă…</p>}
    />
  )
}
