import {
  faBookOpen,
  faLanguage,
  faPenClip,
  faPenRuler,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";

const OtherFeatures = () => {
  const dummy_Object = [
    {
      id: "feature1",
      name: "Language Diversity",
      description:
        "Offer naming suggestions in multiple languages or consider cultural nuances for global appeal.",
      icon: faLanguage,
    },
    {
      id: "feature2",
      name: "User Profiles",
      description: `Create profiles and manage multiple 
        naming projects and settings`,
      icon: faPeopleGroup,
    },
    {
      id: "feature3",
      name: "Customization Options",
      description:
        "Specify criteria such as font, style for tailored name suggestions.",
      icon: faPenClip,
    },
    {
      id: "feature4",
      name: "Trademark Check",
      description:
        " Perform checks to ensure suggested names are not already trad-emarked or in use by other companies.",
      icon: faBookOpen,
    },
    {
      id: "feature5",
      name: "Name Alignment",
      description: ".",
      icon: faPenRuler,
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
              className="w-full m-auto h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black lg:w-full md:p-2 mb-3"
            >
              <p className="text-center m-auto block text-2xl md:text-4xl mb-3">
                <FontAwesomeIcon icon={feature.icon} />
              </p>
              <h1 className="text-center font-bold md:text-xl text-[1.24rem]">
                {feature.name}
              </h1>

              <p className="md:mt-8 mt-4 text-center md:text-xl text-[0.9rem] ">
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
