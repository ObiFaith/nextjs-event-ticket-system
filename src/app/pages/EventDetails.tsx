import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useParams } from "react-router";
import { useEventActions } from "../hook";
import { getStatusColor } from "../../utils";
import { Badge } from "../components/ui/badge";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { lazy, Suspense, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { EventNotFound, EventOverview, TicketTypes } from "./events";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const CancelEventModal = lazy(
  () => import("../pages/events/components/CancelEventModal"),
);

const AddTicketType = lazy(
  () => import("../pages/events/components/AddTicketType"),
);

export const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById } = useEventActions();
  const event = getEventById(eventId!);

  const { getTicketTypesByEvent } = useApp();
  const ticketTypes = getTicketTypesByEvent(eventId!);

  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);

  return event ? (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold">{event.title}</h1>
              <Badge
                className={getStatusColor(event.status)}
                variant="secondary"
              >
                {event.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {format(event.startsAt, "MMM d, yyyy h:mm a")} -{" "}
                {format(event.endsAt, "MMM d, yyyy h:mm a")}
              </span>
            </div>
          </div>
          {event.status === "ACTIVE" && (
            <Suspense fallback={null}>
              <CancelEventModal eventId={eventId!} />
            </Suspense>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <EventOverview
            endsAt={event.endsAt}
            startsAt={event.startsAt}
            description={event.description}
          />
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Manage Ticket Types</h3>
            <Suspense fallback={null}>
              <AddTicketType
                isAddTicketOpen={isAddTicketOpen}
                setIsAddTicketOpen={setIsAddTicketOpen}
              />
            </Suspense>
          </div>

          {ticketTypes.length === 0 ? (
            <Card className="shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  No ticket types created yet
                </p>
                <Button onClick={() => setIsAddTicketOpen(true)}>
                  Add your first ticket type
                </Button>
              </CardContent>
            </Card>
          ) : (
            <TicketTypes ticketTypes={ticketTypes} />
          )}
        </TabsContent>
      </Tabs>
    </main>
  ) : (
    <EventNotFound />
  );
};
