import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WhiteCard from "./whiteCard";
import {
  faBattery2,
  faCoins,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { userDatabase } from "@/utils/User/GetUser";
/*
async function HistoryTest(id) {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          service: "Brand naming",
          id: 1,
          Timestamp: () => {
            const currentDate = new Date();
            currentDate.setHours(Math.trunc(Math.random() * 24));
            currentDate.setMinutes(Math.random() * 60);
            return currentDate;
          },
          tokenUsed: 20,
        },
        {
          service: "product naming",
          id: 2,
          Timestamp: () => {
            const currentDate = new Date();
            currentDate.setHours(Math.trunc(Math.random() * 24));
            currentDate.setMinutes(Math.random() * 60);
            return currentDate;
          },
          tokenUsed: 49,
        },
        {
          service: "character naming",
          id: 3,
          Timestamp: () => {
            const currentDate = new Date();
            currentDate.setHours(Math.trunc(Math.random() * 24));
            currentDate.setMinutes(Math.random() * 60);
            return currentDate;
          },
          tokenUsed: 10,
        },
        {
          service: "start naming",
          id: 4,
          Timestamp: () => {
            const currentDate = new Date();
            currentDate.setHours(Math.trunc(Math.random() * 24));
            currentDate.setMinutes(Math.random() * 60);
            return currentDate;
          },
          tokenUsed: 54,
        },
      ]);
    }, 3000);
  });
  return promise;
}
*/
const TokenUsage = (list) => {
  if (!list) return null;
  return list?.reduce((acc, token) => token?.usage?.totalToken + acc, 0);
};

const recentService = (list) => {
  if (!list) return null;

  let temp = {};

  //Move service date into object and convert to milliseconds
  list.forEach((val) => {
    const service = val?.service;
    const milliSecond = val?.dateCreated;
    const currentDate = new Date(milliSecond);
    temp[service] = currentDate.getTime();
  });

  const highest = Object.keys(temp).reduce((a, b) =>
    temp[a] > temp[b] ? a : b
  );
  return highest;
};

const mostUsed = (list = []) => {
  if (!list) return null;

  let temp = {};

  //Count number of Occurence
  for (const item of list) {
    const service = item?.service;
    if (temp.hasOwnProperty(service)) {
      temp[service] = temp[service] + 1;
    } else {
      temp[service] = 1;
    }
  }

  const highest = Object.keys(temp).reduce((a, b) =>
    temp[a] > temp[b] ? a : b
  );

  return highest;
};

async function HistoryLoad(id, path) {
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

export default async function AiActivity({ id }) {
  const listItems = await HistoryLoad(id, "history");

  if (!listItems || listItems.error)
    return <p>{listItems?.errorMesage || "Something Went Wrong"}</p>;

  const list = listItems?.history;

  if (!list) return null;
  return (
    <WhiteCard cls=" gap-2 text-white  my-10 bg-white flex w-4/5 px-[2rem]">
      <article className="leading-[2.7rem]   p-4 rounded text-xl bg-orange-600">
        <p className="font-bold text-xl ">
          <span className="mr-2">Token Usage</span>
          <FontAwesomeIcon icon={faCoins} />
        </p>
        <p
          className="font-serif italic text-[16px]
    "
        >
          {TokenUsage(list)}
        </p>
      </article>
      <article className="leading-[2rem] text-xl  p-4 rounded bg-orange-500">
        <p className="font-bold text-xl">
          <span className="mr-2">Most Recent Service</span>
          <FontAwesomeIcon icon={faStopwatch} />
        </p>
        <p className="font-serif italic text-[16px]">{recentService(list)}</p>
      </article>
      <article className="leading-[2rem] text-xl  p-4 rounded bg-orange-600">
        <p className="font-bold text-xl">
          <span className="mr-1">Most Used Service</span>
          <FontAwesomeIcon icon={faBattery2} className="rotate-[-90deg]" />
        </p>
        <p className="font-serif italic text-[16px]">{mostUsed(list)}</p>
      </article>
    </WhiteCard>
  );
}
