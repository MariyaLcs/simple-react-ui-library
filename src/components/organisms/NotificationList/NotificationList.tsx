import type { NotificationListProps } from "../../../types";

import Notification from "../../molecules/Notification/Notification";

export default function NotificationList({
  loading = false,
  notifications,
  onToggleRead,
  onDismiss,
}: NotificationListProps) {
  const events = { onToggleRead, onDismiss };

  if (loading) {
    return <div className="list-items">loading</div>;
  }

  if (notifications.length === 0) {
    return <div className="list-items">empty</div>;
  }

  return (
    <div className="list-items">
      {notifications.map((n) => (
        <Notification key={n.id} notification={n} {...events} />
      ))}
    </div>
  );
}
