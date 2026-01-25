import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import WaitingList from "../pages/WaitingList";
import RegistrationWaiting from "../pages/RegistrationWaiting";
import Admin from "../pages/AdminPage";
import App from "../App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "waiting/list", element: <WaitingList /> },
      { path: "admin", element: <Admin /> },
      { path:"waiting/create", element: <RegistrationWaiting/>},
    ],
  },
]);