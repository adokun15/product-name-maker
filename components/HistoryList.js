import React from "react";

const HistoryListPage = ({ listItems }) => {
  function fixTime(t) {
    const date = new Date(t);
    return date.toDateString();
  }
  return (
    <div className="text-black block">
      {listItems?.history?.length !== 0 &&
        listItems?.history?.map((h) => (
          <li
            key={h.historyId}
            className="mb-[2rem] list-none w-[50%] ml-16 border-2 p-3 rounded border-dashed border-orange-500"
          >
            <h3>
              <span className="font-bold"> Service Used: </span>
              {h.service}
            </h3>
            <p>
              <span className="font-bold">Date Generated: </span>
              {fixTime(h.dateCreated)}
            </p>
            <p>
              <span className="font-bold"> Names Generated: </span>

              {h.result}
            </p>
            <p>
              <span className="font-bold"> Token Used: </span>

              {h?.usage.totalToken}
            </p>
          </li>
        ))}
      {listItems?.history?.length === 0 && <p>No History yet!</p>}
    </div>
  );
};

export default HistoryListPage;
