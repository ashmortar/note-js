import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { ErrorPage } from "./pages/error";
import { Notebook } from "./pages/notebook";
import { Layout } from "./pages/layout";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/notebook",
        element: <Notebook />,
      },
    ],
  },
]);

createRoot(document.body).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
