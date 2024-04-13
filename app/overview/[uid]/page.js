import TopDashBoard from "@/components/TopDashBoard";
import AiDashboard from "./_helper/AiDashboard";
import VerifyEmail from "@/components/VerifyEmail";
import { Suspense } from "react";
import SideDashboard from "@/components/SideDashboard";
import LoaderText from "./_helper/LoaderText";
import AiActivity from "@/components/AiActivity";

const DashBoard = ({ params }) => {
  const uid = params.uid;
  return (
    <div className="px-6">
      <h1 className="text-3xl mb-8 text-orange-700">DashBoard</h1>

      {/*Client Component*/}
      <TopDashBoard>
        <Suspense>
          {/*Server Component*/}
          <SideDashboard uid={uid} />
          {/*Server Component*/}
        </Suspense>
      </TopDashBoard>

      {/*Server Component*/}
      <AiDashboard>
        <Suspense fallback={<LoaderText clr="text-white" />}>
          <AiActivity uid={uid} />
        </Suspense>
      </AiDashboard>

      {/*Client Component*/}
      <VerifyEmail uid={uid} />
    </div>
  );
};
export default DashBoard;
