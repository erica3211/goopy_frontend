import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import Waiting from "../pages/WaitingPage";
import Admin from "../pages/AdminPage";
import App from "../App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "waiting", element: <Waiting /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);