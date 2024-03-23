import Image from "next/image";
import SubcribeImg from "../../../public/illustrations/undraw_subscribe_vspl.svg";
import WhiteCard from "@/components/whiteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faNairaSign } from "@fortawesome/free-solid-svg-icons";

export default function ProPlanPage() {
  return (
    <WhiteCard cls="flex bg-white relative py-6 border-2 border-dashed w-[87%] border-orange-500 h-fit m-auto">
      <article className="w-1/2">
        <h1 className="font-medium">Namify Pro Plan</h1>
        <div className="my-[1.4rem]">
          <p className="text-xl mb-5 font-serif">
            More Features await. Sign up for a Pro Plan to get all this and
            more:
          </p>
          <ul className="ml-5  text-[14px]">
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />

              <span>Unlimited Token Access For a Month</span>
            </li>
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />

              <span>Get Results up to 5 different language</span>
            </li>
            <li className="flex gap-4 items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-600"
              />
              <span>Get more AI Suggestions </span>{" "}
            </li>
            <li className="italic">and many more...</li>
          </ul>
        </div>
        <button className="font-semibold capitalize bg-orange-600 text-white px-4 my-3 py-2">
          subcribe
        </button>
        <p className="opacity-[0.8] text-[16px] font-semibold">
          <span className="mr-1">Starting at</span>
          <span className="text-[20px]">
            <FontAwesomeIcon icon={faNairaSign} />
            2900
          </span>{" "}
          per month. Cancel anytime.
        </p>
      </article>

      <figure className="w-1/2 py-4">
        <Image src={SubcribeImg} width={400} height={500} alt="subcribe img" />
      </figure>
    </WhiteCard>
  );
}
