import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store.js";

export default function Shell() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.prefs.theme);
  const link = ({ isActive }) => ({ textDecoration: isActive ? "underline double" : "underline" });

  return (
    <div className={theme === "light" ? "light" : ""}>
      <header>
        <h1>{"FAZA20 – MiniLearn"}</h1>
        <nav>
          <NavLink to="/"        style={link}>{"Acasă"}</NavLink>{" "}
          <NavLink to="/courses" style={link}>{"Cursuri"}</NavLink>{" "}
          <NavLink to="/report"  style={link}>{"Raport"}</NavLink>{" "}
          <NavLink to="/admin"   style={link}>{"Admin"}</NavLink>{" "}
          <NavLink to="/prefs"   style={link}>{"Preferințe"}</NavLink>{" "}
          <button onClick={() => dispatch(actions.toggleTheme())}>
            {`Comută tema (${theme})`}
          </button>
        </nav>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
