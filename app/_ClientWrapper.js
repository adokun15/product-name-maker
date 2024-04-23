"use client";
import OtherFeatures from "@/components/OtherFeatures";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";

import Image from "next/image";
import HomePng from "../public/illustrations/undraw_creation_process_re_kqa9.svg";
import NavBar from "@/components/NavBar";
import Spacer from "@/components/spacer";
import TypeWriterComponent from "typewriter-effect";
import Button from "@/UI/Button";
import { useRouter } from "next/navigation";

export default function ClientWrapper({ children }) {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Spacer />
      <div className="flex md:gap-8  min-h-[70vh] md:h-fit  md:items-center md:px-[2rem]">
        <main className="md:mt-3 mt-12  relative leading-[1.8rem] md:leading-[2rem] mb-10">
          <div className="md:text-5xl text-center capitalize text-[4.7rem] leading-[5rem]">
            <p>
              <span className="text-orange-400 font-bold"> Build</span> and{" "}
              <span className="text-orange-400 font-bold"> Create </span>
              your
            </p>
            <TypeWriterComponent
              options={{
                wrapperClassName: "text-orange-500",
                cursorClassName: "text-orange-500",

                strings: ["Product", "Brand", "Domain", "Start Up"],
                autoStart: true,
                loop: true,
              }}
            />
            Name
          </div>

          <p className="text-center text-[1rem] md:text-[1.3rem] md:mt-4 mt-7 italic opacity-70 ">
            Now you can create your own AI generated name and generated Image
            for logo
          </p>

          <Button
            onClick={() => router.push("/auth")}
            className=" bg-orange-500 mt-[2.49rem] py-3 md:hidden  rounded px-4 text-white font-bold text-center block m-auto my-4"
          >
            Get Started Now
          </Button>
        </main>

        <div className="md:block hidden">
          <Image src={HomePng} alt="HOME pNG" width={500} height={700} />
        </div>
      </div>
      <Features />
      <Testimonials />
      <OtherFeatures />

      {children}
      <footer className="bg-black items-center text-white text-center w-full flex gap-8 py-5 justify-center">
        <p className="italic">Developed by &copy;Daniel Amos</p>
      </footer>
    </>
  );
}
