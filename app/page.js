import ClientWrapper from "./_ClientWrapper";
import ServerWrapper from "./_ServerWrapper";
import HomeModal from "@/components/ModalHome";

export default function HomePage() {
  return (
    <>
      <HomeModal />
      <ClientWrapper>
        <ServerWrapper />
      </ClientWrapper>
    </>
  );
}
