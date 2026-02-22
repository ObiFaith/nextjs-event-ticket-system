import { useNavigate } from "react-router";
import { Button } from "../../../components/ui/button";

export const EventNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Event not found</h1>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
