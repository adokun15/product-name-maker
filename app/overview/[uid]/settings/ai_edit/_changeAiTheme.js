"use client";

import { UpdateAi } from "@/actions/SettingsActions";
import WhiteCard from "@/components/whiteCard";
import Button from "@/UI/Button";
import { useEffect, useState } from "react";

export default function ChangeAITheme({ uid, data }) {
  const [font_size, setFontSize] = useState(1);
  const [font_style, setFontStyle] = useState("Bold");
  const [theme_color, setThemeColor] = useState("black");

  const [ui, setUi] = useState({
    loading: false,
    error: "",
    success: "",
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
    setFontSize((prev) => prev--);
  };
  const decrementValue = () => {
    setFontSize((prev) => prev++);
  };

  function randomTextGenerator() {
    let arr = [
      "What a nice sunny Day",
      "Beware of those Dogs they are quite violent!",
      "That was the best picnic I have ever had. ",
    ];

    const randomValue = Math.trunc(Math.random() * (arr.length + 1));

    return arr[randomValue] || "Have a Nice Day";
  }

  async function SaveAiUpdate() {
    if (font_size > 10 && font_size < 1) {
      setUi(() => {
        return { error: "Font Size settings Exceeds Normal Value!", ...prev };
      });
      return;
    }

    try {
      const ai_theme = await UpdateAi(uid, "theme", {
        ai_font_size: font_size,
        ai_font_style: font_style,
        ai_theme_color: theme_color,
      });
      console.log(ai_theme);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <WhiteCard>
        <h1>Demo Text Result</h1>
        <p
          className={`text-[${font_size}rem] ${theme_color || "text-black"} ${
            font_style || "font-bold"
          }`}
        >
          {randomTextGenerator()}
        </p>
      </WhiteCard>

      <section>
        <h1>Customization Option</h1>
        <div>
          <h3>Font Size</h3>
          <p>{font_size}xl</p>
          <article>
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
              disabled={font_size === 10}
            >
              +
            </Button>
          </article>
          <h3>Color</h3>
          <p>
            Current Theme Color{theme_color ? theme_color : "Black(default"}
          </p>
          <select onChange={colorOnChange}>
            <option value="text-black">Black(default)</option>
            <option value="text-green-600">Green</option>
            <option value="text-purple-700">Purple-blue</option>
            <option value="text-yellow-700">Gold</option>
          </select>

          <h3>Style</h3>
          <p>Current Font Style: {font_style ? font_style : "Bold (default"}</p>
          <select onChange={styleOnChange}>
            <option value="font-bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="font-extrabold">More Bold</option>
            <option value="font-mono">MonoSpace</option>
          </select>
        </div>
        <Button onClick={SaveAiUpdate}> Save</Button>
      </section>
    </main>
  );
}
