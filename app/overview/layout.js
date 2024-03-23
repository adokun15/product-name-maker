import ProfileNav from "@/components/ProfileNav";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
export default async function OverviewLayout({ children, profilemodal }) {
  return (
    <>
      <div className=" grid grid-cols-5 w-full  grid-rows-10 relative h-[100vh]">
        <Sidebar />
        <ProfileNav />
        {profilemodal}
        <div className="col-start-1 col-end-6 overflow-scroll row-span-9 ">
          {children}
        </div>
      </div>
    </>
  );
}
