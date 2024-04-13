import VerifyEmail from "@/components/VerifyEmail";
import ChangeEmail from "./_changeEmail";
import ChangePassword from "./_changePassword";
import ChangeUserName from "./_changeUserName";

export default function ProfileEdit({ params, searchParams }) {
  switch (searchParams.edit) {
    case "username":
      return <ChangeUserName uid={params?.uid} />;
    case "email":
      return <ChangeEmail uid={params?.uid} />;
    case "password":
      return <ChangePassword uid={params?.uid} />;
    case "verify_email":
      return <VerifyEmail />;
    default:
      return <p>Something is not Right!</p>;
  }
}
