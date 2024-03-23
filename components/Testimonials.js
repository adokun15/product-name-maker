import React from "react";
import Card from "./Card";
import someIcon from "../public/illustrations/illustration-Home(1).png";
import Image from "next/image";

import img1 from "../public/testimonial/microsoft-365-d3nKNw1ILdM-unsplash.jpg";
import img2 from "../public/testimonial/irene-strong-v2aKnjMbP_k-unsplash.jpg";
import img3 from "../public/testimonial/helena-lopes-t-wm8iXgvgA-unsplash.jpg";
import img4 from "../public/testimonial/sebastian-pandelache-CicDjqp0I5w-unsplash.jpg";
const Testimonials = () => {
  return (
    <section className="my-6 block px-4 m-auto w-8/10">
      <h1 className="text-7xl border-solid border-b-2 border-orange-500 w-[45%] my-8 md:text-end md:my-[6rem] ">
        Testimonials
      </h1>
      <div className="w-[95%]  md:grid grid-cols-3 gap-5 md:px-12 m-auto">
        <figure className="my-4 bg-slate-800 rounded-xl p-8 dark:bg-slate-800">
          <Image
            className="w-24 h-24 rounded-full mx-auto"
            src={img1}
            alt=""
            width="512"
            height="512"
          />
          <div className="pt-6 text-center space-y-4">
            <blockquote>
              <p className="text-lg text-white font-medium text-center">
                I'm beyond impressed with the AI's ability to generate unique
                and relevant product names. It added a professional touch to my
                brand that made a significant impact."
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-orange-600 dark:text-sky-400">
                Christine Collins
              </div>
              <div className="text-slate-500 dark:text-slate-500">
                Social Media Influencer
              </div>
            </figcaption>
          </div>
        </figure>

        <figure className="my-4 bg-slate-800 rounded-xl p-8 dark:bg-slate-800">
          <Image
            className="w-24 h-24 rounded-full mx-auto"
            src={img2}
            alt=""
            width="384"
            height="512"
          />
          <div className="pt-6 text-center space-y-4">
            <blockquote>
              <p className="text-lg text-white font-medium text-center">
                As a startup, finding the right name was crucial. This AI
                service was a lifesaver! It generated names that reflected our
                vision and made our products stand out in a crowded market."
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-orange-600 dark:text-sky-400">
                Seyon Tobilloba
              </div>
              <div className="text-slate-500 dark:text-slate-500">Student </div>
            </figcaption>
          </div>
        </figure>

        <figure className="my-4 bg-slate-800 rounded-xl p-8 dark:bg-slate-800">
          <Image
            className="w-24 h-24 rounded-full mx-auto"
            src={img3}
            alt=""
            width="384"
            height="512"
          />
          <div className="pt-6 text-center space-y-4">
            <blockquote>
              <p className="text-lg text-white font-medium text-center">
                Using this AI service for product naming was a revelation! It
                not only saved me time but also produced catchy and memorable
                names that resonated with my audience.
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-orange-600 dark:text-sky-400">
                Echemazu James
              </div>
              <div className="text-slate-500 dark:text-slate-500">
                Business Owner
              </div>
            </figcaption>
          </div>
        </figure>

        <figure className="my-4 bg-slate-800 rounded-xl p-8 dark:bg-slate-800">
          <Image
            className="w-[13rem] h-[13rem] rounded-[48%] mx-auto"
            src={img4}
            alt=""
          />
          <div className="pt-6 text-center space-y-4">
            <blockquote>
              <p className="text-lg text-white font-medium text-center">
                I was skeptical at first, but this AI service amazed me with its
                creativity. It came up with names I'd never have thought of and
                helped elevate my product to the next level!
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-orange-600 dark:text-sky-400">
                Adeyeye Folorunsho
              </div>
              <div className="text-slate-500 dark:text-slate-500">
                shop owner
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
