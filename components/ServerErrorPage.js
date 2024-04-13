"use client";
import Image from "next/image";
import NotFoundImg from "@/public/Errors/undraw_page_not_found_re_e9o6.svg";
import ServerErrorImg from "@/public/Errors/undraw_server_down_s-4-lk.svg";
import NetworkErrorImg from "@/public/Errors/undraw_bug_fixing_oc-7-a.svg";
import AuthenticityErrorImg from "@/public/Errors/undraw_access_denied_re_awnf.svg";
import NavBar from "./NavBar";
import Spacer from "./spacer";
import { useRouter } from "next/navigation";
export default function ServerErrorPage({ status, message, onRefresh: rerun }) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onRefresh = rerun ? rerun() : () => router.refresh();
  //refresh
  switch (status) {
    case 404:
      return (
        <>
          <NavBar />
          <Spacer />
          <section className="text-center *:block relative">
            <div className="w-4/5 h-[50vh] overflow-hidden mb-10 m-auto">
              <Image
                className="w-full h-full"
                src={NotFoundImg}
                alt={message}
              />
            </div>
            <h1 className="text-4xl text-slate-500 font-bold mb-4">
              404 Error:
            </h1>
            <p>{message}</p>
          </section>
          <button
            className="block m-auto bg-red-600 rounded px-3 py-1 text-white my-5"
            onClick={goBack}
          >
            Go back
          </button>
        </>
      );
    case 401:
      return (
        <>
          <section className="text-center *:block relative">
            <div className="w-4/5 h-[50vh] overflow-hidden mb-10 m-auto">
              <Image
                className="w-full h-full"
                src={AuthenticityErrorImg}
                alt={message}
              />
            </div>
            <h1 className="text-4xl text-slate-500 font-bold mb-4">
              Authenticity Error:
            </h1>
            <p>{message}</p>
          </section>
          <button
            className="block m-auto bg-red-600 rounded px-3 py-1 text-white my-5"
            onClick={goBack}
          >
            Go back
          </button>
        </>
      );
    case 500:
      return (
        <>
          <section className="text-center *:block relative">
            <div className="w-4/5 h-[50vh] overflow-hidden mb-10 m-auto">
              <Image
                className="w-full h-full"
                src={ServerErrorImg}
                alt={message}
              />
            </div>
            <h1 className="text-4xl text-slate-500 font-bold mb-4">
              Server Error:
            </h1>
            <p>{message}</p>
          </section>
          <button
            className="block m-auto bg-red-600 rounded px-3 py-1 text-white my-5"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </>
      );
    case 502 || message === "unavailable":
      return (
        <>
          <section className="text-center *:block relative">
            <div className="w-4/5 h-[50vh] overflow-hidden mb-10 m-auto">
              <Image
                className="w-full h-full"
                src={NetworkErrorImg}
                alt={message}
              />
            </div>
            <h1 className="text-4xl text-slate-500 font-bold mb-4">
              Server Network Error:
            </h1>
            <p>{message}</p>
          </section>
          <button
            className="block m-auto bg-red-600 rounded px-3 py-1 text-white my-5"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </>
      );
    default:
      return (
        <>
          <section className="text-center *:block relative">
            <div className="w-4/5 h-[50vh] overflow-hidden mb-10 m-auto">
              <Image
                className="w-full h-full"
                src={ServerErrorImg}
                alt={message}
              />
            </div>
            <h1 className="text-4xl text-slate-500 font-bold mb-4">
              Something went Wrong
            </h1>
            <p>{message}</p>
          </section>
          <button
            className="block m-auto bg-red-600 rounded px-3 py-1 text-white my-5"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </>
      );
  }
}
