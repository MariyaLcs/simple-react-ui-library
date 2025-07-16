import { Button } from "../../atoms/Button/Button";
import "./notification.css";

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

export default function Notification({
  notification: { id, message, read },
  onToggleRead,
  onDismiss,
}: NotificationProps) {
  return (
    <div className={`notification-item ${read ? "read" : "unread"}`}>
      <div className="notification-main" aria-label={message}>
        <span className="notification-message">{message}</span>
      </div>
      <div className="notification-actions">
        <Button
          label={read ? "Mark Unread" : "Mark Read"}
          size="small"
          primary={read}
          onClick={() => onToggleRead(id)}
        />
        {onDismiss && (
          <Button label="Dismiss" size="small" onClick={() => onDismiss(id)} />
        )}
      </div>
    </div>
  );
}
