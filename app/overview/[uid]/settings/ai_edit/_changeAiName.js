import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useEffect, useRef,useState } from "react";

export default function ChangeAiName({ uid, data }) {
  const [name, setNmae] = useState("");
  const nameRef = useRef();

  const [ui, setUi] = useState({
    loading: false,
    error: "",
    success: "",
  });

  useEffect(() => {
    //ai_name
    if (data) setNmae(data);
  }, []);

  const SaveAiName = async () => {
    let nameString = nameRef?.current;

    if (!nameString.value) {
      setUi(() => {
        return { error: "Invalid Name!", ...prev };
      });
      return;
    }

    if (nameString.value >= 10) {
      setUi(() => {
        return { error: "Name length is too long!", ...prev };
      });
      return;
    }

    if (nameString.value <= 2) {
      setUi(() => {
        return { error: "Name length is too Short!", ...prev };
      });
      return;
    }

    try {
      const ai_name = await UpdateAi(uid, "name", { name: nameString?.value });
      console.log(ai_name);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <WhiteCard>
      <h1>Change AI Name</h1>
      <div>
        <p>
          Suggest a Name for your AI {";)"}. The length of the Name you are
          about to give the AI must not be long.
        </p>
        <input
          ref={nameRef}
          placeholder={`${data ? data : "Namify(Default)"}`}
        />
        <Button onClick={SaveAiName}>Submit</Button>
      </div>
    </WhiteCard>
  );
}
