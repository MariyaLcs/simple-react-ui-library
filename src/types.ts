//Button Atom
export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

//Notification Molecule

export type NotificationData = {
  id: string;
  message: string;
  read: boolean;
};

export type NotificationProps = {
  notification: NotificationData;
  // eslint-disable-next-line no-unused-vars
  onToggleRead: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onDismiss?: (id: string) => void;
};

//NotificationList Organism
export type NotificationListProps = {
  notifications: NotificationData[];
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onToggleRead: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onDismiss: (id: string) => void;
  // optional: onMarkAllRead?: () => void
};

export interface NotificationBoxState {
  notifications: NotificationData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
