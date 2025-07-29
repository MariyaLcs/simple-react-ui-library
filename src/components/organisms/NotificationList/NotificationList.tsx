import "./notificationList.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../lib/store";
import { toggleRead, dismissNotification } from "../../../lib/store";
import Notification from "../../molecules/Notification/Notification";

export default function NotificationList() {
  const notifications = useSelector(
    (state: RootState) => state.notificationBox.notifications
  );
  const status = useSelector(
    (state: RootState) => state.notificationBox.status
  );

  const dispatch = useDispatch<AppDispatch>();
  const loading = status === "loading";
  // 🔄 Loading skeleton
  const LoadingRow = (
    <div className="nl-loading-item">
      <span className="nl-glow-badge" />
      <span className="nl-glow-text">
        <span></span> <span></span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="nl-list" data-testid="loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>{LoadingRow}</div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="nl-list" data-testid="empty">
        <div className="nl-empty-message">
          <p className="nl-title">No notifications</p>
          <p className="nl-subtitle">You’re all caught up</p>
        </div>
      </div>
    );
  }

  const ordered = [
    ...notifications.filter((n) => !n.read),
    ...notifications.filter((n) => n.read),
  ];

  return (
    <div className="nl-list">
      {ordered.map((n) => (
        <Notification
          key={n.id}
          notification={n}
          onToggleRead={(id) => dispatch(toggleRead({ id }))}
          onDismiss={(id) => dispatch(dismissNotification({ id }))}
        />
      ))}
    </div>
  );
}
