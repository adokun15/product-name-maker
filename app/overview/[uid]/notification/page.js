import NotificationList from "@/components/NotificationList";
import ServerErrorPage from "@/components/ServerErrorPage";
import { userDatabase } from "@/utils/User/GetUser";

export default async function Notification({ params }) {
  const notification = await userDatabase(params.uid, "notifications");

  console.log(notification);

  if (notification.error && notification.status === 403) {
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Notifications</h1>
      <p className="font-bold text-xl text-center">{notification?.message}</p>
    </div>;
  }

  if (notification.error) {
    return (
      <ServerErrorPage
        status={notification?.status}
        message={notification.message}
      />
    );
  }

  return (
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Notifications</h1>
      <NotificationList notifications={notification?.notifications} />
    </div>
  );
}
