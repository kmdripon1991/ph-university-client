import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AdminPaths } from "./admin.routes";
import { routesGenerator } from "../utils/routesGenerator";
import { FacultyPaths } from "./faculty.routes";
import { StudentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(AdminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator(FacultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routesGenerator(StudentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
