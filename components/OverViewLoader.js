import WhiteCard from "./whiteCard";

export const Circular = () => {
  return <div className="h-[100px] w-[100px]  bg-gray-400 rounded-[50%]"></div>;
};
export const Straight = () => {
  return <div className=" h-6 w-40 bg-gray-400 rounded"></div>;
};

export const Square = () => {
  return (
    <div className="h-[8rem]  first:w-[10rem] w-[15rem] rounded bg-gray-400 "></div>
  );
};
export default function OverViewLoader() {
  return (
    <main className="w-4/5  my-4 *:my-8">
      <WhiteCard cls="flex items-center gap-x-16">
        <Circular />
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 my-10">
          <Straight />
          <Straight />
          <Straight />
          <Straight />
        </div>
      </WhiteCard>
      <WhiteCard cls="flex gap-4">
        <Square />
        <Square />
        <Square />
      </WhiteCard>
    </main>
  );
}
