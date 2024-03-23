import collab from "../public/home-features/icons8-collaboration-50.png";
import profiling from "../public/home-features/icons8-profiles-50.png";
import preferences from "../public/home-features/icons8-preferences-50.png";
import React from "react";
import Image from "next/image";
import Card from "./Card";
const Features = () => {
  return (
    <section className="my-[6rem] ">
      <h2 className="font-bold md:text-[4rem] text-[2rem] text-center mt-3">
        What do we bring to the Table?
      </h2>
      <article className="px-[5rem] mt-5">
        <p className="text-center my-8 text-xl font-semibold ">
          Give our AI a few Description and we will automatically create your
          BrandName, Company/Startup Name, Product Name and much more within few
          seconds.
        </p>
        <ul className="md:grid block w-full m-auto min-h-[30rem] p-8 from-orange-400  to-orange-300 rounded bg-gradient-to-tl grid-cols-2 gap-[3rem]">
          <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
            <Image
              className="block m-auto"
              width="50"
              height="50"
              src={collab}
              alt="meal"
            />
            <h1 className="text-center font-bold text-xl">
              Real Time Collaboration
            </h1>
            <p className="mt-4 text-center text-xl  ">
              Implement real-time editing and commenting features, allowing
              multiple users to work on naming projects simultaneously
            </p>
          </Card>
          <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
            <Image
              className="block m-auto"
              width="50"
              height="50"
              src={profiling}
              alt="meal"
            />

            <h1 className="text-center font-bold text-xl">User Profiles</h1>
            <p className="mt-8 text-center text-xl  ">
              Enable users to create profiles where they can manage multiple
              naming projects, preferences, and settings
            </p>
          </Card>
          <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
            <Image
              className="block m-auto"
              width="50"
              height="50"
              src={preferences}
              alt="meal"
            />
            <h1 className="text-center font-bold text-xl">User Preferences</h1>

            <p className="mt-8 text-center text-xl  ">
              Provide tutorials, articles, or FAQs within the dashboard to
              assist users in understanding naming strategies and best practices{" "}
            </p>
          </Card>
        </ul>
      </article>
    </section>
  );
};

export default Features;
