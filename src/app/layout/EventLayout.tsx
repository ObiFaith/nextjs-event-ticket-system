import { Outlet } from "react-router";
import { EventProvider } from "../provider";

export const EventLayout = () => (
  <EventProvider>
    <Outlet />
  </EventProvider>
);
