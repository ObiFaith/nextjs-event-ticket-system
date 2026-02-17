import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Active' | 'Cancelled' | 'Ended';
}

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  totalQuantity: number;
  reservedQuantity: number;
  saleStartDate: Date;
  saleEndDate: Date;
}

export interface CartItem {
  id: string;
  ticketTypeId: string;
  ticketName: string;
  eventName: string;
  eventId: string;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  events: Event[];
  createEvent: (event: Omit<Event, 'id' | 'status'>) => void;
  cancelEvent: (eventId: string) => void;
  getEventById: (id: string) => Event | undefined;
  ticketTypes: TicketType[];
  addTicketType: (ticketType: Omit<TicketType, 'id' | 'reservedQuantity'>) => void;
  deleteTicketType: (id: string) => void;
  getTicketTypesByEvent: (eventId: string) => TicketType[];
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartExpiry: Date | null;
  setCartExpiry: (expiry: Date | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2026',
    description: 'Annual technology conference featuring industry leaders and innovative talks.',
    startDate: new Date('2026-03-15T09:00:00'),
    endDate: new Date('2026-03-17T18:00:00'),
    status: 'Active',
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'Three days of live music performances from top artists around the world.',
    startDate: new Date('2026-07-20T14:00:00'),
    endDate: new Date('2026-07-22T23:00:00'),
    status: 'Active',
  },
];

const mockTicketTypes: TicketType[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Regular Pass',
    totalQuantity: 100,
    reservedQuantity: 45,
    saleStartDate: new Date('2026-01-01T00:00:00'),
    saleEndDate: new Date('2026-03-15T00:00:00'),
  },
  {
    id: '2',
    eventId: '1',
    name: 'VIP Pass',
    totalQuantity: 30,
    reservedQuantity: 20,
    saleStartDate: new Date('2026-01-01T00:00:00'),
    saleEndDate: new Date('2026-03-15T00:00:00'),
  },
  {
    id: '3',
    eventId: '2',
    name: 'General Admission',
    totalQuantity: 500,
    reservedQuantity: 250,
    saleStartDate: new Date('2026-02-01T00:00:00'),
    saleEndDate: new Date('2026-07-20T00:00:00'),
  },
  {
    id: '4',
    eventId: '2',
    name: 'VIP Experience',
    totalQuantity: 50,
    reservedQuantity: 48,
    saleStartDate: new Date('2026-02-01T00:00:00'),
    saleEndDate: new Date('2026-07-20T00:00:00'),
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(mockTicketTypes);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartExpiry, setCartExpiry] = useState<Date | null>(null);

  const login = (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
    });
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup
    setUser({
      id: '1',
      name: name,
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const createEvent = (event: Omit<Event, 'id' | 'status'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      status: 'Active',
    };
    setEvents([...events, newEvent]);
  };

  const cancelEvent = (eventId: string) => {
    setEvents(events.map(e => e.id === eventId ? { ...e, status: 'Cancelled' } : e));
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
  };

  const addTicketType = (ticketType: Omit<TicketType, 'id' | 'reservedQuantity'>) => {
    const newTicketType: TicketType = {
      ...ticketType,
      id: Date.now().toString(),
      reservedQuantity: 0,
    };
    setTicketTypes([...ticketTypes, newTicketType]);
  };

  const deleteTicketType = (id: string) => {
    setTicketTypes(ticketTypes.filter(t => t.id !== id));
  };

  const getTicketTypesByEvent = (eventId: string) => {
    return ticketTypes.filter(t => t.eventId === eventId);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const existingItem = cart.find(
      c => c.ticketTypeId === item.ticketTypeId
    );
    
    if (existingItem) {
      updateCartQuantity(existingItem.id, existingItem.quantity + item.quantity);
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now().toString(),
      };
      setCart([...cart, newItem]);
    }
    
    // Set cart expiry to 10 minutes from now
    if (!cartExpiry) {
      setCartExpiry(new Date(Date.now() + 10 * 60 * 1000));
    }
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    if (cart.length === 1) {
      setCartExpiry(null);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCartExpiry(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        events,
        createEvent,
        cancelEvent,
        getEventById,
        ticketTypes,
        addTicketType,
        deleteTicketType,
        getTicketTypesByEvent,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartExpiry,
        setCartExpiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
