import AIWrapper from "@/components/AIWrapper";
import React from "react";

const StartupNaming = () => {
  const startupNamingData = {
    title: {
      name: "StartUp Type",
      placeholder: "e.g Crafts, E-commerce, Online Clothing Store, etc ",
      prompt: "StartUp for small businesses Naming Service",
    },
    description: {
      name: "Startup description",
      placeholder: "More Info on Your StartUp Business.",
    },
  };

  return (
    <AIWrapper Headertitle="StartUp Naming" formData={startupNamingData} />
  );
};

export default StartupNaming;
