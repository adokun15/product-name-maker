import AIWrapper from "@/components/AIWrapper";
import React from "react";

const CharacterNaming = () => {
  const characterNamingData = {
    title: {
      name: "Character Type",
      placeholder: "e.g Cartoon, Mascot, etc ",
      prompt: "Character Development Naming Service",
    },

    description: {
      name: "Description",
      placeholder: "More Info of how you want to your Character Name to be...",
    },
  };

  return (
    <AIWrapper Headertitle="Character Naming" formData={characterNamingData} />
  );
};

export default CharacterNaming;
