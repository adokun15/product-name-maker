import Notification from "@/app/overview/notification/page";
import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NotificationList() {
  //addli
  const testlist = [
    {
      id: 1,
      title: "Notification Title 1",
      message: "Notification Message 1",
      seen: false,
    },
    {
      id: 2,
      title: "Notification Title 2",
      message: "Notification Message 2",
      seen: false,
    },
    {
      id: 3,
      title: "Notification Title 3",
      message: "Notification Message 3",
      seen: false,
    },
    {
      id: 4,
      title: "Notification Title 4",
      message: "Notification Message 4",
      seen: false,
    },
  ];
  return (
    <ul className="my-4">
      {testlist?.map((notification) => (
        <WhiteCard
          cls="w-[65%] my-6 pb-0 min-h-[2rem] m-auto"
          key={notification.id}
        >
          <h1 className="font-bold text-2xl mb-1">{notification?.title}</h1>
          <p className="italic opacity-65 my-4">{notification.message}</p>
          <div className="flex justify-between pr-4 pb-4">
            <p>2/3/3034 12:19pm</p>
            <button>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </WhiteCard>
      ))}
    </ul>
  );
}
