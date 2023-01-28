import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tv from "./Pages/Tv";
import Home from "./Pages/Home";
import Search from "./Pages/Serach";
import Login from "./Pages/Login";

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
        element: <Tv />,
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
