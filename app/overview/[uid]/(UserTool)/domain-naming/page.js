import AIWrapper from "@/components/AIWrapper";
import React from "react";

const DomainNaming = () => {
  const DomainNamingData = {
    title: {
      name: "Your Company/Organisation Name",
      placeholder: "Your Company Name e.g Cola-Cola ",
      prompt: "Domain Naming Service",
    },
    description: {
      name: "Description",
      placeholder: "Description of what your Company Does/ what it Produces.",
    },
  };

  return (
    <AIWrapper
      Headertitle="Domain Name Generation"
      formData={DomainNamingData}
    />
  );
};

export default DomainNaming;
