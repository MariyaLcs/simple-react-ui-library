import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/store";
import { fetchNotifications } from "../../lib/store";
import NotificationList from "../organisms/NotificationList/NotificationList";

export default function NotificationScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((s: RootState) => s.notificationBox);

  // fetch once on mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (error) return <div role="alert">Error: {error}</div>;

  // NotificationList already uses Redux state for loading/empty/sorted items
  return <NotificationList />;
}
