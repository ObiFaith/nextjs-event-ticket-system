import { Event } from "./type";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  totalQuantity: number;
  reservedQuantity: number;
  saleStartsAt: Date;
  saleEndsAt: Date;
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
  ticketTypes: TicketType[];
  addTicketType: (
    ticketType: Omit<TicketType, "id" | "reservedQuantity">,
  ) => void;
  deleteTicketType: (id: string) => void;
  getTicketTypesByEvent: (eventId: string) => TicketType[];
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartExpiry: Date | null;
  setCartExpiry: (expiry: Date | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockEvents: Array<Event> = [
  {
    id: "1",
    title: "Tech Conference 2026",
    description:
      "Annual technology conference featuring industry leaders and innovative talks.",
    startsAt: new Date("2026-03-15T09:00:00"),
    endsAt: new Date("2026-03-17T18:00:00"),
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description:
      "Three days of live music performances from top artists around the world.",
    startsAt: new Date("2026-07-20T14:00:00"),
    endsAt: new Date("2026-07-22T23:00:00"),
    status: "ACTIVE",
  },
];

const mockTicketTypes: TicketType[] = [
  {
    id: "1",
    eventId: "1",
    name: "Regular Pass",
    totalQuantity: 100,
    reservedQuantity: 45,
    saleStartsAt: new Date("2026-01-01T00:00:00"),
    saleEndsAt: new Date("2026-03-15T00:00:00"),
  },
  {
    id: "2",
    eventId: "1",
    name: "VIP Pass",
    totalQuantity: 30,
    reservedQuantity: 20,
    saleStartsAt: new Date("2026-01-01T00:00:00"),
    saleEndsAt: new Date("2026-03-15T00:00:00"),
  },
  {
    id: "3",
    eventId: "2",
    name: "General Admission",
    totalQuantity: 500,
    reservedQuantity: 250,
    saleStartsAt: new Date("2026-02-01T00:00:00"),
    saleEndsAt: new Date("2026-07-20T00:00:00"),
  },
  {
    id: "4",
    eventId: "2",
    name: "VIP Experience",
    totalQuantity: 50,
    reservedQuantity: 48,
    saleStartsAt: new Date("2026-02-01T00:00:00"),
    saleEndsAt: new Date("2026-07-20T00:00:00"),
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(mockTicketTypes);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartExpiry, setCartExpiry] = useState<Date | null>(null);

  const addTicketType = (
    ticketType: Omit<TicketType, "id" | "reservedQuantity">,
  ) => {
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

  const addToCart = (item: Omit<CartItem, "id">) => {
    const existingItem = cart.find(c => c.ticketTypeId === item.ticketTypeId);

    if (existingItem) {
      updateCartQuantity(
        existingItem.id,
        existingItem.quantity + item.quantity,
      );
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
      setCart(
        cart.map(item => (item.id === id ? { ...item, quantity } : item)),
      );
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
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
