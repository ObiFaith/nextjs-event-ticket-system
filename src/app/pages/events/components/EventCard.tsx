import { format } from "date-fns";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { CalendarDays } from "lucide-react";
import { Event } from "../../../context/type";
import { getStatusColor } from "../../../../utils";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export const EventCard = memo(({ event }: { event: Event }) => {
  const navigate = useNavigate();

  const goPublic = useCallback(
    () => navigate(`/events/${event.id}/public`),
    [navigate, event.id],
  );

  const goManage = useCallback(
    () => navigate(`/events/${event.id}`),
    [navigate, event.id],
  );

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{event.title}</CardTitle>
          <Badge className={getStatusColor(event.status)} variant="secondary">
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
          <Button variant="outline" className="flex-1" onClick={goPublic}>
            View
          </Button>
          <Button className="flex-1" onClick={goManage}>
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
