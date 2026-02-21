import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";
import { useEventActions } from "../hook";
import { Badge } from "../components/ui/badge";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router";
import { Calendar, Minus, Plus, Ticket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const PublicEventView = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEventActions();
  const { getTicketTypesByEvent, addToCart } = useApp();
  const event = getEventById(eventId!);
  const ticketTypes = getTicketTypesByEvent(eventId!);

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Event not found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (ticketId: string, delta: number) => {
    const currentQty = quantities[ticketId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    setQuantities({ ...quantities, [ticketId]: newQty });
  };

  const handleAddToCart = (ticketType: any) => {
    const quantity = quantities[ticketType.id] || 0;
    if (quantity === 0) {
      toast.error("Please select a quantity");
      return;
    }

    const available = ticketType.totalQuantity - ticketType.reservedQuantity;
    if (quantity > available) {
      toast.error("Not enough tickets available");
      return;
    }

    addToCart({
      ticketTypeId: ticketType.id,
      ticketName: ticketType.name,
      eventName: event.title,
      eventId: event.id,
      quantity,
    });

    toast.success(`${quantity} ticket(s) added to cart!`);
    setQuantities({ ...quantities, [ticketType.id]: 0 });
  };

  const isTicketAvailable = (ticket: any) => {
    const now = new Date();
    const available = ticket.totalQuantity - ticket.reservedQuantity;

    if (now < ticket.saleStartDate)
      return { available: false, reason: "Sale not started" };
    if (now > ticket.saleEndDate)
      return { available: false, reason: "Sale ended" };
    if (available <= 0) return { available: false, reason: "Sold out" };

    return { available: true, reason: "" };
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg mb-8">
          <CardHeader className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">
                  {event.status}
                </Badge>
              </div>
              <h1 className="text-4xl font-semibold mb-4">{event.title}</h1>
              <div className="flex flex-col gap-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {format(event.startsAt, "EEEE, MMMM d, yyyy")} at{" "}
                    {format(event.startsAt, "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Ends {format(event.endsAt, "EEEE, MMMM d, yyyy")} at{" "}
                    {format(event.endsAt, "h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold">About this event</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Tickets</h2>
            {ticketTypes.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Ticket className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No tickets available yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {ticketTypes.map(ticket => {
                  const { available, reason } = isTicketAvailable(ticket);
                  const availableCount =
                    ticket.totalQuantity - ticket.reservedQuantity;
                  const quantity = quantities[ticket.id] || 0;

                  return (
                    <Card
                      key={ticket.id}
                      className="shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="mb-2">
                              {ticket.name}
                            </CardTitle>
                            <CardDescription>
                              {available ? (
                                <>
                                  <span className="text-accent font-medium">
                                    {availableCount} tickets left
                                  </span>
                                </>
                              ) : (
                                <span className="text-destructive font-medium">
                                  {reason}
                                </span>
                              )}
                            </CardDescription>
                          </div>
                          {!available && (
                            <Badge
                              variant="secondary"
                              className="bg-muted text-muted-foreground"
                            >
                              {reason}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleQuantityChange(ticket.id, -1)
                              }
                              disabled={!available || quantity === 0}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(ticket.id, 1)}
                              disabled={
                                !available || quantity >= availableCount
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleAddToCart(ticket)}
                            disabled={!available || quantity === 0}
                            className="flex-1"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
