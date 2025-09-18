import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css" 
import Routes from "./routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
       <RouterProvider router={Routes}/>

  </StrictMode>
);