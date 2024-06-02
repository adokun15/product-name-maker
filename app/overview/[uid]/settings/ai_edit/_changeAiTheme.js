"use client";

import { UpdateAi } from "@/actions/SettingsActions";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderText from "../../_helper/LoaderText";

export default function ChangeAITheme({ uid, data }) {
  const auth = useAuth();
  if (!auth.currentUser) return null;

  const [font_size, setFontSize] = useState(1);
  const [font_style, setFontStyle] = useState("Bold");
  const [theme_color, setThemeColor] = useState("black");

  const [ui, setUi] = useState({
    loading: false,
    message: "",
  });

  useEffect(() => {
    //If "available" update value. when component Mounta
    if (data) {
      setFontSize(data?.ai_font_size);
      setFontStyle(data?.ai_font_style);
      setThemeColor(data?.ai_theme_color);
    }
  }, []);

  const colorOnChange = (e) => {
    setThemeColor(e.target.value);
  };
  const styleOnChange = (e) => {
    setFontStyle(e.target.value);
  };

  const incrementValue = () => {
    setFontSize((prev) => (prev = prev + 1));
  };
  const decrementValue = () => {
    setFontSize((prev) => (prev = prev - 1));
  };

  const router = useRouter();

  async function SaveAiUpdate() {
    if (font_size > 5 && font_size < 1) {
      setUi(() => {
        return { message: "Font Size settings Exceeds Normal Value!", ...prev };
      });
      return;
    }

    setUi(() => {
      return { loading: true, message: null };
    });

    try {
      const ai_theme = await UpdateAi(uid, "theme", {
        ai_font_size: font_size,
        ai_font_style: font_style,
        ai_theme_color: theme_color,
      });
      setUi(() => {
        return { message: ai_theme?.message, loading: false };
      });
      console.log(ai_theme);
    } catch (e) {
      setUi(() => {
        return {
          message: e?.message || "Something went wrong",
          loading: false,
        };
      });
    } finally {
      setUi((p) => {
        return { ...p, loading: false };
      });

      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() =>
          router.push(`/overview/${auth.currentUser?.uid}/settings`)
        }
        className="ml-10  text-slate-500"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
        <span> Settings</span>
      </button>
      <main>
        <h1 className="text-2xl text-orange-600 font-bold text-center">
          Change Your AI theme
        </h1>

        <WhiteCard cls="md:w-[45%] my-5 w-[70%] m-auto rounded">
          <h1 className="font-bold text-2xl">Demo Text Result</h1>
          <p
            className={`my-4 text-${font_size}xl ${
              theme_color || "text-black"
            } ${font_style || "font-bold"}`}
          >
            What a nice Sunny Day
          </p>
        </WhiteCard>
        <section className="md:w-[45%] my-5 w-[70%] m-auto rounded">
          <h1 className="font-bold text-2xl">Customization Option</h1>
          {ui.message && (
            <p className="my-6 text-center italic">{ui.message}</p>
          )}
          <div className="font-mono my-3">
            <h3 className="font-semibold">Font Size</h3>
            <p className="bg-slate-200 my-4 outline-slate-400 rounded py-3 w-full px-1">
              {font_size}xl
            </p>
            <article className="flex gap-3">
              <Button
                onClick={decrementValue}
                className="disabled:opacity-80 font-bold"
                disabled={font_size === 1}
              >
                -
              </Button>
              <Button
                onClick={incrementValue}
                className="disabled:opacity-80 font-bold"
                disabled={font_size === 5}
              >
                +
              </Button>
            </article>
            <h3 className="mt-3 font-semibold">Color</h3>
            <select
              className="bg-slate-200 my-3 outline-slate-400 rounded py-3 w-full px-1"
              onChange={colorOnChange}
            >
              <option value="text-black">Black(default)</option>
              <option value="text-green-600">Green</option>
              <option value="text-purple-700">Purple-blue</option>
              <option value="text-yellow-500">Gold</option>
            </select>

            <h3 className="font-semibold mt-4">Style</h3>
            <select
              className="bg-slate-200 my-3 outline-slate-400 rounded py-3 w-full px-1"
              onChange={styleOnChange}
            >
              <option value="font-bold">Bold</option>
              <option value="italic">Italic</option>
              <option value="font-extrabold">More Bold</option>
              <option value="font-mono">MonoSpace</option>
            </select>
          </div>
          <Button onClick={SaveAiUpdate}>
            {" "}
            {ui.loading ? <LoaderText className="text-white" /> : "Save"}
          </Button>
        </section>
      </main>
    </>
  );
}
