import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tv from "./Pages/Tv";
import Home from "./Pages/Home";
import Search from "./Pages/Serach";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
