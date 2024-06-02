"use client";
import Image from "next/image";
import contactImage from "../public/illustrations/undraw_contact_us_re_4qqt.svg";
import React, { useRef, useState } from "react";
import { GetContactEmail } from "@/actions/getContactEmail";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";

const Contact = () => {
  //const GetContact = await GetContactEmail()
  const emailRef = useRef();
  const userNameRef = useRef();
  const messageBodyRef = useRef();

  const [ui, setUi] = useState({
    message: "",
    loading: false,
  });

  const [error, setError] = useState("");
  async function SendEmail(e) {
    e.preventDefault();

    let email = emailRef?.current;
    let messageBody = messageBodyRef?.current;
    let userName = userNameRef?.current;

    if (!email.value || !messageBody.value || !userName.value) {
      setError("Invalid Credentials");
      return;
    }
    setError("");

    setUi(() => {
      return { loading: true };
    });
    try {
      const { message, error } = await GetContactEmail(
        userName?.value,
        email?.value,
        messageBody?.value
      );

      if (error) {
        setUi(() => {
          return { loading: false };
        });
        setError(message);
        return;
      }

      setUi(() => {
        return { message, loading: false };
      });
    } catch (e) {
      setUi(() => {
        return { loading: false };
      });
      setError(e?.message || "Something went Wrong");
    } finally {
      setUi((prev) => {
        return { loading: false, ...prev };
      });
    }
  }

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
            <p>{ui.message ? ui.message : `Drop a message`}</p>
          </h1>
          <form
            onSubmit={SendEmail}
            className="*:block leading-[4rem] m-auto w-[91%] md:w-[60%]"
          >
            {error && <p className="text-red-600 italic">{error}</p>}
            <label>Name</label>
            <input
              ref={userNameRef}
              className="w-full  bg-slate-200 rounded-[0.4rem] outline-none
text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
            />
            <label>Email</label>
            <input
              ref={emailRef}
              className="w-full bg-slate-200 rounded-[0.4rem] outline-none
text-black py-1 px-2 min-h-12 border-2 text-xl  border-gray-700 border-solid transition"
              type="email"
              required
            />
            <label>Message</label>
            <textarea
              ref={messageBodyRef}
              className="w-full  border-2 border-gray-700 border-solid bg-slate-200 rounded-[0.4rem]
              outline-none font-semibold 
              text-black py-1 px-2 min-h-[5rem] transition"
            ></textarea>

            <button className="px-8 block m-auto bg-orange-600 rounded mt-4 text-white font-bold text-xl py-2">
              {ui.loading ? <LoaderText clr="text-white" /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
