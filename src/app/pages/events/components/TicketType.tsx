import { format } from "date-fns";
import { lazy, Suspense } from "react";
import { Badge } from "../../../components/ui/badge";
import { getTicketStatus, getTicketStatusColor } from "../../../../utils";
import { TicketType as TicketTypeInterface } from "../../../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const DeleteTicketType = lazy(() => import("./DeleteTicketType"));

export const TicketType = ({
  ticketType,
}: {
  ticketType: TicketTypeInterface;
}) => {
  const status = getTicketStatus(ticketType);
  const available = ticketType.totalQuantity - ticketType.reservedQuantity;

  return (
    <Card key={ticketType.id} className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <CardTitle>{ticketType.name}</CardTitle>
              <Badge
                className={getTicketStatusColor(status)}
                variant="secondary"
              >
                {status}
              </Badge>
            </div>
            <CardDescription>
              {available} of {ticketType.totalQuantity} tickets available
            </CardDescription>
          </div>
          {/* TODO: Add fallback UI */}
          <Suspense fallback={null}>
            <DeleteTicketType ticketTypeId={ticketType.id} />
          </Suspense>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Sale Start:</span>
            <p className="font-medium">
              {format(ticketType.saleStartsAt, "MMM d, yyyy h:mm a")}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Sale End:</span>
            <p className="font-medium">
              {format(ticketType.saleEndsAt, "MMM d, yyyy h:mm a")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
