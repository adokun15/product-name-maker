import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTools } from "@fortawesome/free-solid-svg-icons";

export const Categorized = ({ header, contents }) => {
  const pathname = usePathname();

  return (
    <div>
      <div className="block text-start text-xl s">
        <FontAwesomeIcon className="mr-4" icon={faTools} />
        User Tool
      </div>
      <ul>
        {contents.map((content) => (
          <li className="text-[15px] ml-4" key={content.name}>
            <Link
              href={`/overview/${content.redirectLink}`}
              className={`${
                pathname === `overview/${content.redirectLink}`
                  ? "font-bold"
                  : ""
              } flex items-center gap-4`}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              {content.name || ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
