import "./styles/index.css";
import { router } from "./app/routes";
import { AuthProvider } from "./app/provider";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "./app/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
  </AuthProvider>,
);
