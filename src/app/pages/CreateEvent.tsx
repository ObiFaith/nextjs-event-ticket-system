import { toast } from "sonner";
import { EventForm } from "../form";
import { useEventActions } from "../hook";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { FormInput } from "../components/common/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent } = useEventActions();
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const handleFormInput = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEventForm(prev => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const handleTextarea = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEventForm(prev => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(eventForm);
    const { title, description, startDate, endDate, startTime, endTime } =
      eventForm;

    if (
      !title ||
      !description ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      toast.error("End date must be after start date");
      return;
    }

    createEvent({
      title,
      description,
      startsAt: start,
      endsAt: end,
    });

    toast.success("Event created successfully!");
    navigate("/dashboard");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Create Event</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new event
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Provide information about your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-x-4 space-y-6"
          >
            {EventForm.map(field =>
              field.type !== "textarea" ? (
                <FormInput
                  id={field.id}
                  key={field.id}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  onChange={handleFormInput(field.id)}
                  value={eventForm[field.id as keyof typeof eventForm]}
                  className={field.id === "title" ? "col-span-2" : ""}
                />
              ) : (
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">{field.label}</Label>
                  <Textarea
                    rows={4}
                    id={field.id}
                    placeholder={field.placeholder}
                    onChange={handleTextarea(field.id)}
                    value={eventForm[field.id as keyof typeof eventForm]}
                  />
                </div>
              ),
            )}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 sm:flex-none">
                Create Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
