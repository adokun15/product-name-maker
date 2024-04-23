import Card from "@/components/Card";
import HomeModal from "@/components/ModalHome";
import NavBar from "@/components/NavBar";
import NewsLetter from "@/components/NewsLetter";
import OtherFeatures from "@/components/OtherFeatures";
import Spacer from "@/components/spacer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Features = () => {
  const dummy_Object = [
    {
      id: "feature1",
      name: "Language Diversity",
      description:
        "Offer naming suggestions in multiple languages or consider cultural nuances for global appeal.",
    },
    {
      id: "feature3",
      name: "Customization Options",
      description:
        "Allow users to specify criteria such as length, style, or industry-specific keywords for tailored name suggestions.",
    },
    {
      id: "feature4",
      name: "Trademark Check",
      description:
        " Perform checks to ensure suggested names are not already trademarked or in use by other companies.",
      //icon: faBookOpen,
    },
    {
      id: "feature5",
      name: "Brand Alignment",
      description:
        "Incorporate brand values, tone, and identity into suggested names to ensure alignment with the company's ethos.",
      // icon: faPenRuler,
    },
    {
      id: "feature6",
      name: "Semantic Analysis",
      description:
        " Understand the meanings behind words and suggest names that align with the product's essence or purpose.",
      //icon: faScaleBalanced,
    },
  ];
  return (
    <div>
      <HomeModal />

      <NavBar />
      <Spacer />
      <div className="">
        <h1 className="text-center font-bold text-orange-500 text-2xl">
          {" "}
          Features
        </h1>
        <p className="text-center text-5xl text-orange-400 my-[3rem]">
          Generate AI Powered Name In 1 Click.
        </p>
        <div className="">
          <ul className="rounded-t-3xl md:grid block w-full m-auto min-h-[30rem] *:mb-4 md:p-8 py-6 mb-4 from-orange-400  to-orange-300 rounded bg-gradient-to-tl grid-cols-1 md:grid-cols-2 gap-[3rem]">
            {dummy_Object.map((feature) => (
              <Card
                key={feature.id}
                className="md:w-full w-[90%] m-auto h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2"
              >
                <h1 className="text-center font-bold text-xl">
                  {feature.name}
                </h1>
                <p className="mt-8 text-center text-xl  ">
                  {feature.description}
                </p>
              </Card>
            ))}
          </ul>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Features;
