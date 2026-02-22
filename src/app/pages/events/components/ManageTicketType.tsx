import { TicketTypes } from "..";
import { useApp } from "../../../context/AppContext";
import { Button } from "../../../components/ui/button";
import { TabsContent } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { lazy, memo, Suspense, useCallback, useMemo, useState } from "react";

const AddTicketTypeContainer = lazy(
  () => import("../components/AddTicketTypeContainer"),
);

const ManageTicketType = ({ eventId }: { eventId: string }) => {
  const { getTicketTypesByEvent } = useApp();
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);

  const ticketTypes = useMemo(
    () => getTicketTypesByEvent(eventId),
    [eventId, getTicketTypesByEvent],
  );
  const openAddTicket = useCallback(() => {
    setIsAddTicketOpen(true);
  }, []);

  return (
    <TabsContent value="tickets" className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Ticket Types</h3>
        <Suspense fallback={null}>
          <AddTicketTypeContainer
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
            <Button onClick={openAddTicket}>Add your first ticket type</Button>
          </CardContent>
        </Card>
      ) : (
        <TicketTypes ticketTypes={ticketTypes} />
      )}
    </TabsContent>
  );
};

export default memo(ManageTicketType);
