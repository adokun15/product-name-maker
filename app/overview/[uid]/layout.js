import ModalInfo from "@/components/ModalInfo";
import ProfileNav from "@/components/ProfileNav";
import Sidebar from "@/components/Sidebar";
export default function OverviewLayout({ children, profilemodal }) {
  return (
    <>
      <ModalInfo />
      <div className=" md:grid grid-cols-5 w-full block h-fit grid-rows-10  md:h-[100vh]">
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
