import NotificationCard from "./NotificationCard";

export default function NotificationList({ notifications }) {
  if (!notifications.length) {
    return <p>No notifications available</p>;
  }

  return (
    <div>
      {notifications.map((item) => (
        <NotificationCard key={item.ID} item={item} />
      ))}
    </div>
  );
}