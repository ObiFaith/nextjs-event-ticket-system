export const LoginForm = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "you@example.com",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "••••••••",
  },
];

export const SignupForm = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
  },
  ...LoginForm,
  {
    id: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "••••••••",
  },
];

export const EventForm = [
  {
    id: "title",
    type: "text",
    label: "Event Title *",
    placeholder: "Enter event title",
  },
  {
    id: "description",
    type: "textarea",
    label: "Event Description *",
    placeholder: "Describe your event",
  },
  {
    id: "startDate",
    type: "date",
    label: "Start Date *",
  },
  {
    id: "startTime",
    type: "time",
    label: "Start Time *",
  },
  {
    id: "endDate",
    type: "date",
    label: "End Date *",
  },
  {
    id: "endTime",
    type: "time",
    label: "End Time *",
  },
];

export const TicketTypeForm = [
  {
    id: "ticketName",
    type: "text",
    label: "Ticket Name *",
    placeholder: "e.g. Regular, VIP",
  },
  {
    id: "quantity",
    type: "number",
    label: "Total Quantity *",
    placeholder: "100",
  },
  {
    id: "saleStartDate",
    type: "date",
    label: "Sale Start Date *",
  },
  {
    id: "saleStartTime",
    type: "time",
    label: "Sale Start Time *",
  },
  {
    id: "saleEndDate",
    type: "date",
    label: "Sale End Date *",
  },
  {
    id: "saleEndTime",
    type: "time",
    label: "Sale End Time *",
  },
];
