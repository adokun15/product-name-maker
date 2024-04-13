import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WhiteCard from "./whiteCard";
import {
  faBattery2,
  faCoins,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { userDatabase } from "@/utils/User/GetUser";

const TokenUsage = (list = []) => {
  if (!list || list.length === 0) return null;
  return list?.reduce((acc, token) => token?.usage?.totalToken + acc, 0);
};

const recentService = (list = []) => {
  if (!list || list.length === 0) return null;

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
  if (!list || list.length === 0) return null;

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
    } else if (err?.message?.includes("User document is Not Available")) {
      return { error: true, errorMesage: "Invalid User Error" };
    } else {
      return { error: true, errorMesage: err.message };
    }
  }
}

export default async function AiActivity({ uid }) {
  const listItems = await HistoryLoad(uid, "history");

  if (!listItems || listItems?.error)
    return (
      <WhiteCard cls=" my-10 bg-white block md:w-4/5 w-full  px-[2rem]">
        <p>
          {listItems?.errorMesage ||
            "Something Went Wrong loading Ai Activities"}
        </p>
      </WhiteCard>
    );

  const list = listItems?.history;

  if (!list) return null;

  return (
    <>
      <h2 className="text-2xl font-medium mb-4">Ai Activity</h2>
      <WhiteCard cls=" gap-2 text-white  my-10 bg-white md:flex block md:w-4/5 w-full *:mb-4 px-[2rem]">
        <article className="leading-[2.7rem]   p-4 rounded text-xl bg-orange-600">
          <p className="font-bold text-xl ">
            <span className="mr-2">Token Usage</span>
            <FontAwesomeIcon icon={faCoins} />
          </p>
          <p
            className="font-serif italic text-[16px]
    "
          >
            {TokenUsage(list) || 0}
          </p>
        </article>
        <article className="leading-[2rem] text-xl  p-4 rounded bg-orange-500">
          <p className="font-bold text-xl">
            <span className="mr-2">Most Recent Service</span>
            <FontAwesomeIcon icon={faStopwatch} />
          </p>
          <p className="font-serif italic text-[16px]">
            {recentService(list) || 0}
          </p>
        </article>
        <article className="leading-[2rem] text-xl  p-4 rounded bg-orange-600">
          <p className="font-bold text-xl">
            <span className="mr-1">Most Used Service</span>
            <FontAwesomeIcon icon={faBattery2} className="rotate-[-90deg]" />
          </p>
          <p className="font-serif italic text-[16px]">{mostUsed(list) || 0}</p>
        </article>
      </WhiteCard>
    </>
  );
}
