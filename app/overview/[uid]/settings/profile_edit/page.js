import VerifyEmail from "@/components/VerifyEmail";
import ChangeEmail from "./_changeEmail";
import ChangePassword from "./_changePassword";
import ChangeUserName from "./_changeUserName";
import { userDatabase } from "@/utils/User/GetUser";

export default async function ProfileEdit({ params, searchParams }) {
  const customer = await userDatabase(params.uid);

  if (customer?.status === 403) {
    return (
      <ServerErrorPage
        status={subscription?.status}
        message={subscription?.message}
      />
    );
  }

  switch (searchParams.edit) {
    case "username":
      return (
        <ChangeUserName
          uid={params?.uid}
          customer_code={customer?.customer_info?.customer_code || null}
        />
      );
    case "email":
      return (
        <ChangeEmail
          uid={params?.uid}
          customer_code={customer?.customer_info?.customer_code || null}
        />
      );
    case "password":
      return <ChangePassword uid={params?.uid} />;
    case "verify_email":
      return <VerifyEmail />;
    default:
      return <p>Something is not Right!</p>;
  }
}
