import Image from "next/image";
import contactImage from "../public/illustrations/undraw_contact_us_re_4qqt.svg";
import React from "react";

const Contact = () => {
  return (
    <section className="my-6 block px-4 m-auto w-8/10">
      <h1 className="text-7xl border-solid border-b-2 border-orange-500 w-[45%] my-8 md:text-end md:my-[6rem] ">
        Contact us
      </h1>
      <div className="flex">
        <Image
          alt=""
          height="700"
          width="550"
          className="md:block hidden"
          src={contactImage}
        />

        <div className="shadow-lg m-auto w-[80%] py-6">
          <h1 className="font-bold text-2xl text-center">
            if there is any issue you want to complain or if you need more
            information.
          </h1>
          <form className="*:block leading-[4rem] m-auto w-[60%]">
            <label>Name</label>
            <input
              className="w-full transition bg-slate-200 rounded-[0.4rem] outline-none
    text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
            />
            <label>Email</label>
            <input
              className="w-full transition bg-slate-200 rounded-[0.4rem] outline-none
    text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
            />
            <label>Message</label>
            <textarea
              className="w-full transition border-2 border-gray-700 border-solid bg-slate-200 rounded-[0.4rem]
               outline-none font-semibold 
          text-black py-1 px-2 min-h-[5rem] transition"
            ></textarea>

            <button className="px-8 block m-auto bg-orange-600 rounded mt-4 text-white font-bold text-xl py-2">
              submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
