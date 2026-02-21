export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
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
