import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import TvPage from "./Pages/TvPage";

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
        path: "/movies/:title/:id",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <TvPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
