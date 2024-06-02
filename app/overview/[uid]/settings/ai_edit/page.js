import { userDatabase } from "@/utils/User/GetUser";
import ChangeAiName from "./_changeAiName";
import ChangeAITheme from "./_changeAiTheme";
import ServerErrorPage from "@/components/ServerErrorPage";

export default async function AiEdit({ params, searchParams }) {
  /*const getAIcustomization = await userDatabase(params?.uid);

  if (getAIcustomization?.error) {
    return (
      <ServerErrorPage
        message={getAIcustomization?.message}
        status={getAIcustomization?.status}
      />
    );
  }
  */

  //let Namedata = getAIcustomization?.ai_name ?? null;
  let Namedata = null;

  //const ThemeData = getAIcustomization?.ai_theme ?? null;
  let ThemeData = null;

  switch (searchParams.edit) {
    case "theme":
      return <ChangeAITheme uid={params?.uid} data={ThemeData} />;
    case "name":
      return <ChangeAiName uid={params?.uid} data={Namedata} />;
    default:
      return <p>Something is not Right!</p>;
  }
}
