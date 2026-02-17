import { Cart } from "./pages/Cart";
import { Root } from "./pages/Root";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./layout/AuthLayout";
import { CreateEvent } from "./pages/CreateEvent";
import { createBrowserRouter } from "react-router";
import { EventDetails } from "./pages/EventDetails";
import { PublicEventView } from "./pages/PublicEventView";
import { LoginContainer } from "./pages/login/LoginContainer";
import { SignupContainer } from "./pages/signup/SignupContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        Component: AuthLayout,
        children: [
          { index: true, Component: LoginContainer },
          { path: "signup", Component: SignupContainer },
        ],
      },
      { path: "dashboard", Component: Dashboard },
      { path: "create-event", Component: CreateEvent },
      { path: "events/:eventId", Component: EventDetails },
      { path: "events/:eventId/public", Component: PublicEventView },
      { path: "cart", Component: Cart },
      { path: "*", Component: NotFound },
    ],
  },
]);
