import React from "react";
import Features from "./Features";
import Card from "./Card";

import Image from "next/image";
import someIcon from "../public/illustrations/illustration-Home(1).png";
import {
  faBookOpen,
  faLanguage,
  faPenClip,
  faPenRuler,
  faScaleBalanced,
  faSmile,
  faThermometer,
  faTrademark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OtherFeatures = () => {
  const dummy_Object = [
    {
      id: "feature1",
      name: "Language Diversity",
      description:
        "Offer naming suggestions in multiple languages or consider cultural nuances for global appeal.",
      icon: faLanguage,
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
      icon: faPenClip,
    },
    {
      id: "feature4",
      name: "Trademark Check",
      description:
        " Perform checks to ensure suggested names are not already trademarked or in use by other companies.",
      icon: faBookOpen,
    },
    {
      id: "feature5",
      name: "Brand Alignment",
      description:
        "Incorporate brand values, tone, and identity into suggested names to ensure alignment with the company's ethos.",
      icon: faPenRuler,
    },
    {
      id: "feature6",
      name: "Semantic Analysis",
      description:
        " Understand the meanings behind words and suggest names that align with the product's essence or purpose.",
      icon: faScaleBalanced,
    },
  ];
  return (
    <section className="md:my-6 my-[5.99rem] block px-4 m-auto w-full">
      <h1 className="md:text-7xl text-4xl text-center md:text-start italic mx-3 border-solid border-b-2 border-orange-500  my-5  md:my-[6rem] ">
        What Else is there to Explore...
      </h1>
      <div className="">
        <ul className="md:grid block w-full m-auto min-h-[30rem] md:p-8 p-3 rounded-[0.8rem] from-orange-400  to-orange-300 md:rounded bg-gradient-to-tl grid-cols-1 md:grid-cols-2 gap-[1.6rem]">
          {dummy_Object.map((feature) => (
            <Card
              key={feature.id}
              className="w-full m-auto h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black lg:w-full md:p-2"
            >
              <p className="text-center m-auto block text-4xl mb-3">
                <FontAwesomeIcon icon={feature.icon} />
              </p>
              <h1 className="text-center font-bold md:text-xl text-[1.44rem]">
                {feature.name}
              </h1>

              <p className="md:mt-8 mt-4 text-center md:text-xl text-[0.99rem] ">
                {feature.description}
              </p>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OtherFeatures;
