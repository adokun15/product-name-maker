export default function NewsLetter() {
  return (
    <div className="bg-black text-white min-h-[50vh] py-8 text-center">
      <form className="*:block">
        <h2 className="font-bold my-2 md:text-3xl text-xl text-center">
          Enter Your Email For Weekly NewsLetter{" "}
        </h2>
        <p className="italic opacity-75 text-[17px] my-8">
          Get weekly Random names with meaning that might suit you or your
          business{" "}
        </p>
        <input
          type="email"
          placeholder="Enter your Email Address"
          className="w-4/5 py-2 text-xl px-3 block m-auto my-4"
        />
        <button className="px-8 block m-auto my-4  bg-orange-600 rounded  text-white font-bold text-xl py-2">
          submit
        </button>
      </form>
    </div>
  );
}
