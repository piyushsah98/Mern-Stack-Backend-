import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../../features/auth/ui/pages/Register";
import Login from "../../features/auth/ui/pages/Login";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
