import HistoryListPage from "@/components/HistoryList";
import { userDatabase } from "@/utils/User/GetUser";

async function HistoryList(id, path) {
  try {
    const user = await userDatabase(id, path);
    return user;
  } catch (err) {
    if (err.message.includes("client is offline")) {
      return { error: true, errorMesage: "No Internet Connection" };
    } else if (err.message.includes("User document is Not Available")) {
      return { error: true, errorMesage: "Invalid User Error" };
    } else {
      return { error: true, errorMesage: err.message };
    }
  }
}

export default async function Page({ searchParams }) {
  const listItems = await HistoryList(searchParams.id, "history");

  //  console.log("from history", listItems);
  if (!listItems || listItems.error)
    return <p>{listItems?.errorMesage || "Something Went Wrong"}</p>;
  return (
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">History</h1>
      <HistoryListPage listItems={listItems} />
    </div>
  );
}
