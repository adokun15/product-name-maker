import React from "react";
import AIWrapper from "@/components/AIWrapper";
const BrandNaming = () => {
  const BrandData = {
    title: {
      name: "Brand Name",
      placeholder: "What is your Brand Niche ",
      prompt: "Brand Naming Service",
    },
    description: { name: "Description", placeholder: " What is About?" },
  };

  return <AIWrapper Headertitle="Brand Naming" formData={BrandData} />;
};

export default BrandNaming;
