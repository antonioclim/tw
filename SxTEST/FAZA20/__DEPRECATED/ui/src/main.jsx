import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./theme.css";
import { store } from "./store.js";
import Shell from "./shell/Shell.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import Lesson from "./pages/Lesson.jsx";
import Report from "./pages/Report.jsx";
import Admin from "./pages/Admin.jsx";
import Prefs from "./pages/Prefs.jsx";

const router = createHashRouter([
  { path:"/", element:<Shell/>, children:[
    { index:true, element:<Home/> },
    { path:"courses", element:<Courses/> },
    { path:"lesson/:id", element:<Lesson/> },
    { path:"report", element:<Report/> },
    { path:"admin", element:<Admin/> },
    { path:"prefs", element:<Prefs/> }
  ]}
], { future:{ v7_startTransition:true, v7_relativeSplatPath:true } });

createRoot(document.getElementById("root")).render(
  <Provider store={store}><RouterProvider router={router} future={{ v7_startTransition:true, v7_relativeSplatPath:true }}/></Provider>
);
