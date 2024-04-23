import React from "react";
import Card from "./Card";
import Spacer from "./spacer";

const Features = () => {
  return (
    <>
      <section className="md:my-[6rem] my-[2.5rem] px-3 md:px-0">
        <h2 className="font-bold md:text-[4rem] text-center  text-[2.5rem]  mt-3">
          What do we bring to the Table?
        </h2>
        <article className="md:px-[5rem] mt-5  px-1 ">
          <p className="text-center md:my-8 my-10 md:text-xl  text-[0.75rem] opacity-80 italic font-medium ">
            Give our AI a few Description and we will automatically create your
            BrandName, Company/Startup Name, Product Name and much more within
            few seconds.
          </p>
          <ul className="w-full m-auto md:grid lg:grid block min-h-[30rem] *:mb-4 p-4 md:p-8 from-orange-400  to-orange-300 rounded bg-gradient-to-tl grid-cols-2 gap-[1rem]">
            <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
              <h1 className="text-center font-bold tex t-xl">
                Brand Naming AI
              </h1>
              <p className="mt-4 text-center text-[0.95rem] md:text-[1.21rem] ">
                Utilize advanced algorithms and linguistic analysis, our brand
                naming AI generates innovative, memorable and professional brand
                names tailores to your business objectives.
              </p>
            </Card>
            <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
              <h1 className="text-center font-bold text-xl">
                Product Naming AI
              </h1>
              <p className="mt-4 text-center text-[0.95rem] md:text-[1.21rem] ">
                Elevate your product branding Strategy with our state-of-art
                product naming AI. Harnessing the power of machine learning and
                natural language process, our AI generates unique marketable
                product names, helping you stand out in today's competitive
                landscape.
              </p>
            </Card>
            <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
              <h1 className="text-center font-bold text-xl">
                Domain Naming AI
              </h1>

              <p className="mt-4 text-center text-[0.95rem] md:text-[1.21rem] ">
                Empower your online presence with our cutting-edge domain naming
                AI. By combining advanced algorithms with intuitive design
                principles, our AI swiftly generates memorable and brand-aligned
                domain name, ensuring your website leaves a lasting impressions
              </p>
            </Card>

            <Card className="lg:w-full w-full h-[100%] bg-white shadow-lg rounded-[0.9rem] text-black p-2">
              <h1 className="text-center font-bold text-xl">
                Character Naming AI
              </h1>

              <p className="mt-4 text-center text-[0.95rem] md:text-[1.21rem] ">
                The AI IS designed for writers, gamers and storyteller in
                crafting compelling and memorable Character names. Enhanced your
                narrative with our cutting-edge technology, effortlessly
                bringing your Characters to life with names thats captive and
                resonate with your audience.
              </p>
            </Card>
          </ul>
        </article>
      </section>
    </>
  );
};

export default Features;
