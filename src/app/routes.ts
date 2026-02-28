import { Cart } from "./pages/Cart";
import { Root } from "./pages/Root";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { createBrowserRouter } from "react-router";
import { DashboardLayout, EventLayout } from "./layout";
import { PublicEventView } from "./pages/PublicEventView";
import { EventContainer, EventDetails } from "./pages/events";
import { LoginContainer } from "./pages/login/LoginContainer";
import { SignupContainer } from "./pages/signup/SignupContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    // Component: Root,
    children: [
      { index: true, Component: LoginContainer },
      { path: "signup", Component: SignupContainer },
      {
        Component: DashboardLayout,
        children: [
          {
            Component: EventLayout,
            children: [
              { path: "dashboard", Component: Dashboard },
              { path: "create-event", Component: EventContainer },
              { path: "events/:eventId", Component: EventDetails },
              { path: "events/:eventId/public", Component: PublicEventView },
            ],
          },
          { path: "cart", Component: Cart },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
