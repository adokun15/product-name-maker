import HistoryListPage from "@/components/HistoryList";
import ServerErrorPage from "@/components/ServerErrorPage";
import { userDatabase } from "@/utils/User/GetUser";

export default async function HistoryPage({ params }) {
  const listItems = await userDatabase(params.uid, "history");

  if (listItems.error && listItems.status === 403) {
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">History</h1>
      <p className="font-bold text-xl text-center">{listItems?.message}</p>
    </div>;
  }
  if (listItems.error) {
    return (
      <ServerErrorPage
        status={listItems?.status}
        message={listItems?.message}
      />
    );
  }

  return (
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">History</h1>
      <HistoryListPage listItems={listItems} />
    </div>
  );
}
