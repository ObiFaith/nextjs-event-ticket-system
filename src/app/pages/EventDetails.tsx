import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Navigation } from '../components/Navigation';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
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
} from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Calendar, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { getEventById, cancelEvent, getTicketTypesByEvent, addTicketType, deleteTicketType } = useApp();
  const event = getEventById(eventId!);
  const ticketTypes = getTicketTypesByEvent(eventId!);

  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [ticketName, setTicketName] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [saleStartDate, setSaleStartDate] = useState('');
  const [saleStartTime, setSaleStartTime] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  const [saleEndTime, setSaleEndTime] = useState('');

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Event not found</h1>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  const handleCancelEvent = () => {
    cancelEvent(eventId!);
    toast.success('Event cancelled successfully');
    navigate('/dashboard');
  };

  const handleAddTicket = () => {
    if (!ticketName || !totalQuantity || !saleStartDate || !saleStartTime || !saleEndDate || !saleEndTime) {
      toast.error('Please fill in all fields');
      return;
    }

    const start = new Date(`${saleStartDate}T${saleStartTime}`);
    const end = new Date(`${saleEndDate}T${saleEndTime}`);

    if (end <= start) {
      toast.error('End date must be after start date');
      return;
    }

    addTicketType({
      eventId: eventId!,
      name: ticketName,
      totalQuantity: parseInt(totalQuantity),
      saleStartDate: start,
      saleEndDate: end,
    });

    toast.success('Ticket type added successfully!');
    setIsAddTicketOpen(false);
    setTicketName('');
    setTotalQuantity('');
    setSaleStartDate('');
    setSaleStartTime('');
    setSaleEndDate('');
    setSaleEndTime('');
  };

  const handleDeleteTicket = (ticketId: string) => {
    deleteTicketType(ticketId);
    toast.success('Ticket type deleted successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-accent text-accent-foreground';
      case 'Cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'Ended':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTicketStatus = (ticket: any) => {
    const now = new Date();
    if (now < ticket.saleStartDate) return 'Not Started';
    if (now > ticket.saleEndDate) return 'Sale Ended';
    return 'On Sale';
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'On Sale':
        return 'bg-accent text-accent-foreground';
      case 'Sale Ended':
        return 'bg-muted text-muted-foreground';
      case 'Not Started':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-semibold">{event.title}</h1>
                <Badge className={getStatusColor(event.status)} variant="secondary">
                  {event.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(event.startDate, 'MMM d, yyyy h:mm a')} - {format(event.endDate, 'MMM d, yyyy h:mm a')}
                </span>
              </div>
            </div>
            {event.status === 'Active' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel Event</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will cancel the event and all ticket sales. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, keep event</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelEvent}>
                      Yes, cancel event
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="font-medium mb-1">Start Date & Time</h4>
                    <p className="text-muted-foreground">
                      {format(event.startDate, 'MMMM d, yyyy')} at {format(event.startDate, 'h:mm a')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">End Date & Time</h4>
                    <p className="text-muted-foreground">
                      {format(event.endDate, 'MMMM d, yyyy')} at {format(event.endDate, 'h:mm a')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manage Ticket Types</h3>
              <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
                <DialogTrigger asChild>
                  <Button>Add Ticket Type</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Ticket Type</DialogTitle>
                    <DialogDescription>
                      Create a new ticket type for this event
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticketName">Ticket Name *</Label>
                      <Input
                        id="ticketName"
                        placeholder="e.g. Regular, VIP"
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Total Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="100"
                        value={totalQuantity}
                        onChange={(e) => setTotalQuantity(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="saleStartDate">Sale Start Date *</Label>
                        <Input
                          id="saleStartDate"
                          type="date"
                          value={saleStartDate}
                          onChange={(e) => setSaleStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="saleStartTime">Sale Start Time *</Label>
                        <Input
                          id="saleStartTime"
                          type="time"
                          value={saleStartTime}
                          onChange={(e) => setSaleStartTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="saleEndDate">Sale End Date *</Label>
                        <Input
                          id="saleEndDate"
                          type="date"
                          value={saleEndDate}
                          onChange={(e) => setSaleEndDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="saleEndTime">Sale End Time *</Label>
                        <Input
                          id="saleEndTime"
                          type="time"
                          value={saleEndTime}
                          onChange={(e) => setSaleEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddTicketOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTicket}>Save Ticket</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {ticketTypes.length === 0 ? (
              <Card className="shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">No ticket types created yet</p>
                  <Button onClick={() => setIsAddTicketOpen(true)}>Add your first ticket type</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {ticketTypes.map((ticket) => {
                  const status = getTicketStatus(ticket);
                  const available = ticket.totalQuantity - ticket.reservedQuantity;
                  
                  return (
                    <Card key={ticket.id} className="shadow-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <CardTitle>{ticket.name}</CardTitle>
                              <Badge className={getTicketStatusColor(status)} variant="secondary">
                                {status}
                              </Badge>
                            </div>
                            <CardDescription>
                              {available} of {ticket.totalQuantity} tickets available
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete ticket type?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this ticket type. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteTicket(ticket.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Sale Start:</span>
                            <p className="font-medium">{format(ticket.saleStartDate, 'MMM d, yyyy h:mm a')}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Sale End:</span>
                            <p className="font-medium">{format(ticket.saleEndDate, 'MMM d, yyyy h:mm a')}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MobileBottomNav />
    </div>
  );
};