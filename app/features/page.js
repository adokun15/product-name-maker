import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
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
      //icon: faLanguage,
    } /*
    {
      id: "feature2",
      name: "Collaborative Tools",
      description:
        "Facilitate collaboration by enabling users to share and refine suggested names within teams or communities.",
      icon: "",
    },*/,
    {
      id: "feature3",
      name: "Customization Options",
      description:
        "Allow users to specify criteria such as length, style, or industry-specific keywords for tailored name suggestions.",
      //icon: faPenClip,
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
      <NavBar></NavBar>
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
          <ul className="rounded-t-3xl md:grid block w-full m-auto min-h-[30rem] *:mb-4 p-8 from-orange-400  to-orange-300 rounded bg-gradient-to-tl grid-cols-1 md:grid-cols-2 gap-[3rem]">
            {dummy_Object.map((feature) => (
              <Card
                key={feature.id}
                className="lg:w-full w-[90%] m-auto h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2"
              >
                {/*    <p className="text-center m-auto block text-4xl mb-3">
                  <FontAwesomeIcon icon={feature.icon} />
                </p>
            */}{" "}
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
    </div>
  );
};

export default Features;