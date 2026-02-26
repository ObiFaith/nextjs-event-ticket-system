import { toast } from "sonner";
import { EventFormType } from "../type";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { useEventActions } from "../../../hook";
import { EventPresenter } from "./EventPresenter";
import { parseDateTime } from "../../../../utils";

export const EventContainer = () => {
  const navigate = useNavigate();
  const { createEvent } = useEventActions();
  const [eventForm, setEventForm] = useState<EventFormType>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = useCallback(
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventForm(prev => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  const handleClick = () => {
    navigate("/dashboard");
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const { startDate, startTime, endDate, endTime } = eventForm;
    const emptyField = Object.entries(eventForm).find(([_, value]) => !value);
    if (emptyField) {
      toast.error("Please fill in all fields");
      return;
    }

    const startsAt = parseDateTime(startDate, startTime);
    const endsAt = parseDateTime(endDate, endTime);

    if (endsAt <= startsAt) {
      toast.error("End date must be after start date");
      return;
    }

    createEvent({
      ...eventForm,
      startsAt,
      endsAt,
    });

    toast.success("Event created successfully!");
    navigate("/dashboard");
  }, [eventForm, createEvent, navigate]);

  return (
    <EventPresenter
      eventForm={eventForm}
      onClick={handleClick}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};
