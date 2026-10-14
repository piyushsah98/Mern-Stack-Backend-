import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "../features/url/pages/HomePage";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
