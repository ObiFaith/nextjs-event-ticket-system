import { memo } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export const EventOverview = memo(
  ({
    description,
    startsAt,
    endsAt,
  }: {
    description?: string;
    startsAt: Date;
    endsAt: Date;
  }) => {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <CardDescription className="text-muted-foreground">
                {description}
              </CardDescription>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h4 className="font-medium mb-1">Start Date & Time</h4>
              <p className="text-muted-foreground">
                {format(startsAt, "MMMM d, yyyy")} at{" "}
                {format(startsAt, "h:mm a")}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">End Date & Time</h4>
              <p className="text-muted-foreground">
                {format(endsAt, "MMMM d, yyyy")} at {format(endsAt, "h:mm a")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
