export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
};

export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getErrorMessage = (error: any) => {
  const backendMessage = error?.response?.data?.message;
  const errorMessage = Array.isArray(backendMessage)
    ? backendMessage[0]
    : backendMessage;

  return errorMessage;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-accent text-accent-foreground";
    case "CANCELLED":
      return "bg-destructive text-destructive-foreground";
    case "ENDED":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const getTicketStatus = (ticket: any) => {
  const now = new Date();
  if (now < ticket.saleStartsAt) return "Not Started";
  if (now > ticket.saleEndsAt) return "Sale Ended";
  return "On Sale";
};

export const getTicketStatusColor = (status: string) => {
  switch (status) {
    case "On Sale":
      return "bg-accent text-accent-foreground";
    case "Sale Ended":
      return "bg-muted text-muted-foreground";
    case "Not Started":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const parseDateTime = (date: string, time: string) => {
  const d = new Date(`${date}T${time}`);
  return d.toISOString();
};
