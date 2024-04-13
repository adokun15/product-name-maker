import Image from "next/image";
import contactImage from "../public/illustrations/undraw_contact_us_re_4qqt.svg";
import React from "react";

const Contact = () => {
  return (
    <section className="md:my-6 my-[4.4rem] block px-4 m-auto w-8/10">
      <h1 className="md:text-7xl text-[2rem] border-solid border-b-2 border-orange-500 w-[60%] my-8 md:text-end md:my-[6rem] ">
        Contact us
      </h1>
      <div className="md:flex block">
        <Image
          alt=""
          height="700"
          width="550"
          className="md:block hidden"
          src={contactImage}
        />

        <div className="shadow-lg m-auto md:w-[80%] w-[95%] md:py-6 py-2">
          <h1 className="font-bold md:text-2xl text-[1.1rem] text-center">
            If there is any issue you would like to complain or If you need more
            information.
          </h1>
          <form className="*:block leading-[4rem] m-auto w-[91%] md:w-[60%]">
            <label>Name</label>
            <input
              className="w-full  bg-slate-200 rounded-[0.4rem] outline-none
    text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
            />
            <label>Email</label>
            <input
              className="w-full bg-slate-200 rounded-[0.4rem] outline-none
    text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
            type="email"
            required/>
            <label>Message</label>
            <textarea
              className="w-full  border-2 border-gray-700 border-solid bg-slate-200 rounded-[0.4rem]
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
