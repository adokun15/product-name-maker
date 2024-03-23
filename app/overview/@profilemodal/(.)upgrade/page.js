import Modal from "@/components/Modal";
import ProPlanPage from "../../_helper/ProPlanPage";

const page = () => {
  return (
    <Modal removeCard={true}>
      <ProPlanPage />
    </Modal>
  );
};

export default page;
