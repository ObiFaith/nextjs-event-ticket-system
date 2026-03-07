import { Plus } from "lucide-react";
import { useEventState } from "../hook";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { EmptyEvent, EventList } from "./events";

export const Dashboard = () => {
  const events = useEventState();
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Events</h1>
          <p className="text-muted-foreground">
            Manage your events and ticket sales
          </p>
        </div>
        {events.length !== 0 && (
          <Button
            onClick={() => navigate("/create-event")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        )}
      </div>
      {events.length === 0 ? <EmptyEvent /> : <EventList events={events} />}
    </main>
  );
};
