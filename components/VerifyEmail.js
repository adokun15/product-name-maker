import WhiteCard from "./whiteCard";

export default async function VerifyEmail() {
  //verify on firebase

  return (
    <>
      {" "}
      <h2 className="text-2xl font-medium mb-3">Email Verification</h2>
      <WhiteCard cls="bg-orange-500 text-white">
        <h2 className="font-bold text-xl mb-5">
          Your email amosdaniel@gmail.com is yet to be verify
        </h2>
        <p>Click the button to get a verification link sent to your email</p>
        <button className="bg-white p-2 px-4 text-orange-700 font-medium my-3 hover:bg-slate-300 transition">
          Verify
        </button>
      </WhiteCard>
    </>
  );
}
