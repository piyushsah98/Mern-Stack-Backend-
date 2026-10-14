import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../features/auth/pages/Register";
import Profile from "../features/auth/pages/Profile";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
