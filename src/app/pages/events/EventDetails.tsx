import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useParams } from "react-router";
import { useEventActions } from "../../hook";
import { getStatusColor } from "../../../utils";
import { lazy, Suspense, useMemo } from "react";
import { Badge } from "../../components/ui/badge";
import { EventNotFound, EventOverview } from "../events";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const ManageTicketType = lazy(() => import("./components/ManageTicketType"));
const CancelEventModal = lazy(() => import("./components/CancelEventModal"));

export const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById } = useEventActions();

  const event = useMemo(
    () => (eventId ? getEventById(eventId) : null),
    [eventId, getEventById],
  );

  if (!event) return <EventNotFound />;

  return (
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
              <CancelEventModal eventId={event.id} />
            </Suspense>
          )}
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="tickets">
            Ticket Types
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <EventOverview
            endsAt={event.endsAt}
            startsAt={event.startsAt}
            description={event.description}
          />
        </TabsContent>
        <Suspense fallback={null}>
          <ManageTicketType eventId={event.id} />
        </Suspense>
      </Tabs>
    </main>
  );
};
