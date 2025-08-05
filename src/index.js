import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./componenets/Layout";
import About from "./componenets/About";
import Home from "./componenets/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About></About>,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


