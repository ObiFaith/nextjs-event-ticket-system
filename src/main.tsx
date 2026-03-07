import "./styles/index.css";
import { Toaster } from "sonner";
import { router } from "./app/routes";
import { AuthProvider } from "./app/provider";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
  </AuthProvider>,
);
