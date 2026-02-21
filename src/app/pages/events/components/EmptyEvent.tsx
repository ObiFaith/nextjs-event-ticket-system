import { useNavigate } from "react-router";
import { Calendar, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export const EmptyEvent = () => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Calendar className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          You haven't created any events yet
        </h3>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          Start by creating your first event and managing ticket sales all in
          one place
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
  );
};
