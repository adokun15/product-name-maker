import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoaderText = ({ clr = "text-white" }) => {
  return (
    <>
      <FontAwesomeIcon icon={faSpinner} className={`animate-spin ${clr}`} />
    </>
  );
};

export default LoaderText;
