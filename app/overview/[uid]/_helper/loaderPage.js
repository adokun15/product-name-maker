"use client";
import loaderImg from "../../../../public/icons/icons8-loader-100.png";
import Image from "next/image";
const LoaderPage = ({ message = "loading" }) => {
  return (
    <div className="w-full mt-10">
      <div>
        <Image
          height={100}
          width={100}
          alt="loading"
          className="animate-spin block m-auto "
          src={loaderImg}
        />
      </div>
      <p className="italic text-center mt-3">{message}</p>
    </div>
  );
};

export default LoaderPage;
