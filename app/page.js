"use client";
import Image from "next/image";
import HomePng from "../public/illustrations/undraw_creation_process_re_kqa9.svg";
import NavBar from "@/components/NavBar";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import OtherFeatures from "@/components/OtherFeatures";
import Spacer from "@/components/spacer";
import NewsLetter from "@/components/NewsLetter";
import TypeWriterComponent from "typewriter-effect";
export default function Home() {
  return (
    <>
      <NavBar />
      <Spacer />
      <div className="flex md:gap-8  h-[70vh] md:h-fit  md:items-center md:px-[2rem]">
        <main className="md:mt-3 mt-12  relative leading-[4rem] md:leading-[2rem]">
          <div className="md:text-5xl text-[2.9rem]  text-center capitalize">
            <p>
              <span className="text-orange-400 font-bold"> Build</span> and{" "}
              <span className="text-orange-400 font-bold"> Create </span>
              your
            </p>
            <TypeWriterComponent
              options={{
                strings: ["Product", "Brand", "Domain", "Start Up"],
                autoStart: true,
                loop: true,
              }}
            />
            Name
          </div>

          <p className="text-center text-sm md:text-[1.3rem] md:mt-4 mt-7 italic font-semibold">
            Now you can create your own AI generated name and generated Image
            for logo
          </p>

          <button className="bg-orange-400 mt-[2.49rem] md:hidden block rounded px-4 text-white text-center block m-auto my-4">
            Get Started Now
          </button>
        </main>

        <div className="md:block hidden">
          <Image src={HomePng} alt="HOME pNG" width={500} height={700} />
        </div>
      </div>
      <Features />
      <Testimonials />
      <OtherFeatures />
      <NewsLetter />
      <Contact />

      <footer className="bg-black items-center text-white text-center w-full flex gap-8 py-5 justify-center">
        <p className="italic">Developed by &copy;Daniel Amos</p>
      </footer>
    </>
  );
}
