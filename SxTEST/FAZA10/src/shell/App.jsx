import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function App(){
  const link = ({isActive}) => ({ textDecoration: isActive?'underline double':'underline' })
  return (
    <>
      <header>
        <h1>SxTEST — FAZA10</h1>
        <nav>
          <NavLink to="/" style={link}>Acasă</NavLink>
          <NavLink to="/courses" style={link}>Cursuri</NavLink>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}
