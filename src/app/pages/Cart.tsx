import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Clock, Info, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartExpiry } =
    useApp();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!cartExpiry) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = cartExpiry.getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        clearCart();
        toast.error("Your cart has expired. Please add items again.");
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [cartExpiry, clearCart]);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    updateCartQuantity(id, item.quantity + delta);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const totalTickets = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-sm max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-muted rounded-full p-6 mb-4">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Browse events and add tickets to your cart to get started
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Browse Events
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>
          <p className="text-muted-foreground">Review your selected tickets</p>
        </div>

        {cartExpiry && (
          <Alert className="mb-6 border-accent/50 bg-accent/10">
            <Clock className="h-4 w-4 text-accent" />
            <AlertDescription className="text-accent-foreground/90">
              Your reservation expires in{" "}
              <span className="font-semibold">{timeLeft}</span> minutes
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <Card key={item.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="mb-1">{item.ticketName}</CardTitle>
                    <CardDescription>{item.eventName}</CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-accent/20 text-accent-foreground"
                  >
                    Reserved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove from cart?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove the ticket from your cart and release
                          the reservation.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Total Tickets:</span>
              <span className="font-semibold">{totalTickets}</span>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900 text-sm">
                Tickets are reserved temporarily. No payment is required for
                this demo.
              </AlertDescription>
            </Alert>

            <div className="pt-4 space-y-3">
              <Button className="w-full" size="lg" disabled>
                Checkout (Payment Not Implemented)
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Payment integration is not available in this demo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
