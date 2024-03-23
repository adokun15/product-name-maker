"use client";
import Image from "next/image";

import HomePng from "../public/illustrations/undraw_creation_process_re_kqa9.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GetUser } from "@/utils/User/GetUser";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import OtherFeatures from "@/components/OtherFeatures";
import Spacer from "@/components/spacer";
import NewsLetter from "@/components/NewsLetter";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    //const d = GetUser();
    //console.log(d);
    //return () => d();
  }, []);

  return (
    <>
      <NavBar />
      <Spacer />
      <div className="flex gap-8 h-[100vh] md:h-fit items-center px-[2rem]">
        <main className="mt-3  relative leading-[4rem] md:leading-[2rem]">
          <div className="md:text-5xl text-[2.2rem]  text-center capitalize">
            <span className="text-orange-400 font-bold"> Build</span> and{" "}
            <span className="text-orange-400 font-bold"> Create </span>
            your original
            <span className="block text-orange-400 font-medium italic">
              "Product,Brand,Domain"
            </span>
            Names
          </div>

          <p className="text-center text-sm md:text-[1.3rem] mt-4 italic font-semibold">
            Now you can create your own AI generated name and generated Image
            for logo
          </p>
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
