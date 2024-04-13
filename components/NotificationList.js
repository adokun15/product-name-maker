import WhiteCard from "./whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NotificationList({ notifications }) {
  //addli
  return (
    <ul className="my-4">
      {notifications?.map((notification) => (
        <WhiteCard
          cls="w-[65%] my-6 pb-0 min-h-[2rem] m-auto"
          key={notification.id}
        >
          <h1 className="font-bold text-2xl mb-1">{notification?.title}</h1>
          <p className="italic opacity-65 my-4">{notification.message}</p>
          <div className="flex justify-between pr-4 pb-4">
            <p>{notification?.dateCreated}</p>
            <button>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </WhiteCard>
      ))}
    </ul>
  );
}
