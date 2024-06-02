"use client";
import { GetNewsletterEmail } from "@/actions/getNewsletterEmail";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";
import { useRef, useState } from "react";
export default function NewsLetter() {
  const emailRef = useRef();

  const [ui, setUi] = useState({
    message: "",
    loading: false,
  });

  const [error, setError] = useState("");

  async function SendEmail(e) {
    e.preventDefault();

    const email = emailRef?.current?.value;

    setUi(() => {
      return { loading: true };
    });
    try {
      const { message, error } = await GetNewsletterEmail(email);

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
      setError(e?.message);
    } finally {
      setUi((prev) => {
        return { loading: false, ...prev };
      });
    }
  }

  return (
    <div className="bg-black text-white min-h-[50vh] py-8 text-center">
      <form onSubmit={SendEmail} className="*:block md:w-3/5 w">
        {ui.message ? (
          <p className="text-xl text-center font-bold">{ui.message}</p>
        ) : (
          <>
            <h2 className="font-bold my-2 md:text-3xl text-xl text-center">
              Enter Your Email For Weekly NewsLetter{" "}
            </h2>
            {error ? (
              <p className="text-red-400 font-bold">{error}</p>
            ) : (
              <p className="italic opacity-75 text-[17px] my-8">
                Get weekly Random names with meaning that might suit you or your
                business
              </p>
            )}
            <input
              required
              type="email"
              ref={emailRef}
              placeholder="Enter your Email Address"
              className="w-4/5 py-2 text-xl px-3 text-black block m-auto my-4"
            />
            <button className="px-8 block m-auto my-4  bg-orange-600 rounded  text-white font-bold text-xl py-2">
              {ui.loading ? <LoaderText clr="text-white" /> : "submit"}
            </button>
          </>
        )}{" "}
      </form>
    </div>
  );
}
