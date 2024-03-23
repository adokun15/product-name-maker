import { getApp } from "firebase/app";
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CreateCustomer } from "../PayStack/customer/CreateCustomer";
import { UpdateUserProfile } from "../User/UpdateUser";
export async function SignUpWithEmailAndPassWord(emailStr, password, username) {
  //app();

  const otherapp = getApp();
  console.log(username);
  const auth = getAuth();

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailStr,
      password
    );

    await UpdateUserProfile(username);

    const { uid, email, providerData, emailVerified } = userCred.user;

    await CreateCustomer({
      email,
      name: username,
      userId: uid,
    });

    //Update with Database

    const createdAtDate = new Date();
    const user = {
      userId: uid,
      userEmail: email,
      userCreationDate: createdAtDate.toISOString(),
      profileImage: providerData[0].photoURL,
      username: providerData[0].displayName,
      emailIsVerified: emailVerified,
    };

    return user;
  } catch (error) {
    console.log(error);
    throw new Response(
      {
        message:
          error.message ||
          error?.code ||
          error?.customData.message ||
          "SomeThing Went Wrong!",
      },
      { status: 500 }
    );
  }

  //  return { email, password };
}
