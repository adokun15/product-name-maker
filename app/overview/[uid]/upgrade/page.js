import ProPlanPage from "../_helper/ProPlanPage";

const UpgradePage = ({ params }) => {
  return (
    <>
      <h1 className="my-[2rem] text-3xl font-bold text-center">
        Upgrade to Pro Plan
      </h1>
      <ProPlanPage id={params?.uid} />
    </>
  );
};

export default UpgradePage;
