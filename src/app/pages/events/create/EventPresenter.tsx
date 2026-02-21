import { EventFormType } from "./type";
import { EventForm } from "../../../form";
import { ChangeEvent, FormEvent } from "react";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { FormInput } from "../../../components/common/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export const EventPresenter = ({
  eventForm,
  onClick,
  onSubmit,
  onChange,
}: {
  onClick: () => void;
  eventForm: EventFormType;
  onSubmit: (e: FormEvent<Element>) => void;
  onChange: (
    field: string,
  ) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}) => {
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
            onSubmit={onSubmit}
            className="grid md:grid-cols-2 gap-x-4 space-y-6"
          >
            {EventForm.map(field =>
              field.type !== "textarea" ? (
                <FormInput
                  id={field.id}
                  key={field.id}
                  type={field.type}
                  label={field.label}
                  onChange={onChange(field.id)}
                  placeholder={field.placeholder}
                  value={eventForm[field.id as keyof typeof eventForm]}
                  className={field.id === "title" ? "col-span-2" : ""}
                />
              ) : (
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">{field.label}</Label>
                  <Textarea
                    rows={4}
                    id={field.id}
                    onChange={onChange(field.id)}
                    placeholder={field.placeholder}
                    value={eventForm[field.id as keyof typeof eventForm]}
                  />
                </div>
              ),
            )}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClick}
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
