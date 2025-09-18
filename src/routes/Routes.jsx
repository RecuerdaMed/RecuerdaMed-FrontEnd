import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import App from "../App.jsx";
// import Login from "../pages/Login";
// import Register from "../pages/Register";

const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Ruta raíz → Dashboard
        element: <Dashboard/>,
      },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
    ],
  },
]);

export default RoutesApp;