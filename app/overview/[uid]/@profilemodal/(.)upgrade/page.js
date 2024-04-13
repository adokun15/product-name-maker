import Modal from "@/components/Modal";
import ProPlanPage from "../../_helper/ProPlanPage";

const page = ({ params }) => {
  return (
    <Modal removeCard={true}>
      <ProPlanPage id={params?.uid} />
    </Modal>
  );
};

export default page;
