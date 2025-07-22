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
  onToggleRead: (id: string) => void;
  onDismiss?: (id: string) => void;
};

//NotificationList Organism
export type NotificationListProps = {
  notifications: NotificationData[];
  loading?: boolean;
  onToggleRead: (id: string) => void;
  onDismiss: (id: string) => void;
  // optional: onMarkAllRead?: () => void
};
