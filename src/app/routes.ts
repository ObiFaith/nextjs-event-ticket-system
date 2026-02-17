import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CreateEvent } from './pages/CreateEvent';
import { EventDetails } from './pages/EventDetails';
import { PublicEventView } from './pages/PublicEventView';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: 'signup', Component: Signup },
      { path: 'dashboard', Component: Dashboard },
      { path: 'create-event', Component: CreateEvent },
      { path: 'events/:eventId', Component: EventDetails },
      { path: 'events/:eventId/public', Component: PublicEventView },
      { path: 'cart', Component: Cart },
      { path: '*', Component: NotFound },
    ],
  },
]);
