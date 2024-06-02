"use client";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoaderText from "../../_helper/LoaderText";
import { UpdateAi } from "@/actions/SettingsActions";

export default function ChangeAiName({ uid, data }) {
  const auth = useAuth();

  if (!auth.currentUser) return null;

  const [name, setNmae] = useState("");
  const nameRef = useRef();

  const [ui, setUi] = useState({
    loading: false,
    message: "",
  });

  useEffect(() => {
    //ai_name
    if (data) setNmae(data);
  }, []);
  const router = useRouter();

  const SaveAiName = async () => {
    let nameString = nameRef?.current;

    if (!nameString.value) {
      setUi((prev) => {
        return { message: "Invalid Name!", ...prev };
      });
      return;
    }

    if (nameString.value >= 10) {
      setUi((prev) => {
        return { message: "Name length is too long!", ...prev };
      });
      return;
    }

    if (nameString.value <= 2) {
      setUi((prev) => {
        return { message: "Name length is too Short!", ...prev };
      });
      return;
    }

    setUi(() => {
      return {
        loading: true,
        message: null,
      };
    });

    await UpdateAi(uid, "name", { name: nameString?.value })
      .then((data) => {
        setUi(() => {
          return { message: data?.message, loading: false };
        });
      })
      .catch((err) => {
        setUi(() => {
          return {
            message: err?.message || "Something went wrong",
            loading: false,
          };
        });
      })
      .finally(() => {
        setUi((prev) => {
          return { loading: false, ...prev };
        });

        router.refresh();
      });
  };

  return (
    <>
      <button
        onClick={() =>
          router.push(`/overview/${auth.currentUser?.uid}/settings`)
        }
        className="ml-10  text-slate-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span> Settings</span>
      </button>

      <WhiteCard cls="md:w-[45%] my-5 w-[70%] m-auto rounded">
        <h1 className="text-2xl text-orange-600 font-bold">Change AI Name</h1>
        <div className="*:block *:mt-4 my-5">
          <p>
            {ui?.message
              ? ui?.message
              : `Suggest a name for your AI. The length of the Name you are
            about to give the AI must not be long.`}
          </p>

          <input
            ref={nameRef}
            className="bg-slate-200 outline-slate-400 rounded py-3 w-full px-1"
            placeholder={`${name ? name : "Namify(Default)"}`}
          />
          <Button disabled={ui.loading} onClick={SaveAiName}>
            {ui.loading ? <LoaderText clr="text-white" /> : "Submit"}
          </Button>
        </div>
      </WhiteCard>
    </>
  );
}
