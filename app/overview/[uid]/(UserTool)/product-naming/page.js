import AIWrapper from "@/components/AIWrapper";
import React from "react";

const ProductNaming = () => {
  const productNamingData = {
    title: {
      name: "Product Name Generation",
      placeholder: "e.g Clothee, Electronics, Jewelry Accessories, etc ",
      prompt: "Product Naming Service",
    },
    description: {
      name: "Product Description",
      placeholder:
        "Describe more about product e.g An Electronics Shop With Tv and Phones only.",
    },
  };

  return (
    <AIWrapper
      Headertitle="Product Name Generation"
      formData={productNamingData}
    />
  );
};

export default ProductNaming;
