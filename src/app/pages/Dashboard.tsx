import { format } from "date-fns";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import { useEvent } from "../hook/useEvent";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, CalendarDays, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const Dashboard = () => {
  const { user } = useAuth();
  const { events } = useEvent();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-accent text-accent-foreground";
      case "CANCELLED":
        return "bg-destructive text-destructive-foreground";
      case "ENDED":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Events</h1>
          <p className="text-muted-foreground">
            Manage your events and ticket sales
          </p>
        </div>
        <Button
          onClick={() => navigate("/create-event")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-muted rounded-full p-6 mb-4">
              <Calendar className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              You haven't created any events yet
            </h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Start by creating your first event and managing ticket sales all
              in one place
            </p>
            <Button
              onClick={() => navigate("/create-event")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create your first event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <Card
              key={event.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <Badge
                    className={getStatusColor(event.status)}
                    variant="secondary"
                  >
                    {event.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {format(event.startsAt, "MMM d, yyyy")} -{" "}
                    {format(event.endsAt, "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/events/${event.id}/public`)}
                  >
                    View
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};
