"use client";
import { getApp } from "firebase/app";
import { app, auth, provider } from "@/firebase/client";

import { useEffect, useState } from "react";
import Card from "./Card";
import Image from "next/image";

import GoogleIcon from "../public/icons/icons8-google-48.png";
//import { AuthContext } from "../utils/Provider/AuthProvider";

import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/Provider/AuthProvider";
import { signInWithRedirect } from "firebase/auth";
import ErrorMessage from "./ErrorMessages";
import LoaderText from "@/app/overview/[uid]/_helper/LoaderText";
//import { CreateUser } from "@/actions/user/create";

export const SignInForm = ({
  submitForm,
  onchangeInput,
  handleBlurInput,
  email,
  isLoading,
  password,
  inputError,
  handleGoogle,
  mobilegoogleLogin,
}) => {
  return (
    <form className="my-5 w-[90%] m-auto" onSubmit={submitForm}>
      <p className="font-semibold">Email Address</p>
      <input
        type="email"
        value={email}
        onBlur={() => handleBlurInput("email")}
        onChange={(ev) => onchangeInput("email", ev.target.value)}
        placeholder="productmaker@gmail.com"
        className="block border-1 w-full border-solid my-5 rounded border-black bg-slate-300 placeholder:text-black
        px-3 py-4  focus:filter transition-all outline-gray-400"
      />

      <div className="error-text">
        {inputError.emailIsInvalid && "please enter a valid email Address"}
      </div>
      <p className="font-semibold">Password</p>
      <input
        type="password"
        value={password}
        onBlur={() => handleBlurInput("password")}
        onChange={(ev) => onchangeInput("password", ev.target.value)}
        placeholder="********"
        className="block border-1 w-full border-solid my-5 rounded border-black bg-slate-300 placeholder:text-black
    px-3 py-4  focus:filter transition-all outline-gray-400"
      />

      <div className="error-text">
        {inputError.passwordIsInvalid && "Invalid password"}
      </div>
      <button className="filled_large_btn_black w-full block px-1 focus:bg-slate-700 focus:text-white hover:text-black">
        {isLoading ? <LoaderText clr="text-white" /> : "Submit"}
      </button>
      <button
        type="button"
        onClick={handleGoogle}
        className="outline_large_btn_black w-full mt-5 hidden md:block px-1 hover:bg-white hover:text-black"
      >
        <Image
          className="m-auto inline mr-2"
          src={GoogleIcon}
          alt="google icon"
          height={20}
          width={20}
        />
        <span>Sign in with Google</span>
      </button>
      <button
        type="button"
        onClick={mobilegoogleLogin}
        className="md:hidden block outline_large_btn_black w-full mt-5  px-1 hover:bg-white hover:text-black"
      >
        <Image
          className="m-auto inline mr-2"
          src={GoogleIcon}
          alt="google icon"
          height={20}
          width={20}
        />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

const AuthForm = ({ redirect_error }) => {
  // const { currentUser, SignInGoogle } = useContext(AuthContext);

  const user = useAuth();

  const router = useRouter();

  const [login, setLogin] = useState(false);

  //ui
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorFromForm, setFormError] = useState(null);

  const [enteredValue, setEnteredValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    username: false,
    password: false,
  });

  const [checkError, setCheckError] = useState(null);

  const invalidCharacter = [
    " ",
    "#",
    "!",
    "%",
    "^",
    "-",
    "(",
    ")",
    "+",
    "=",
    "`",
    `"`,
    "?",
  ];

  const emailIsInvalid = didEdit.email && !enteredValue.email.includes("@");
  const passwordIsInvalid =
    didEdit.password && enteredValue.password.length < 6;
  const usernameIsInvalid = didEdit.username && checkError;

  useEffect(() => {
    for (const val of enteredValue?.username.split("")) {
      if (invalidCharacter.includes(val)) {
        setCheckError(true);
      } else {
        setCheckError(false);
      }
    }
    if (enteredValue.username === "") setCheckError(false);
    setFormError(redirect_error);
  }, [enteredValue.username, didEdit.username, redirect_error]);

  function handleInputChange(identifier, value) {
    setEnteredValue((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));

    setDidEdit((prevVal) => ({
      ...prevVal,
      [identifier]: false,
    }));
  }

  function handleInputEdit(identifier) {
    setDidEdit((prevVal) => ({
      ...prevVal,
      [identifier]: true,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordIsInvalid || emailIsInvalid) return;

    if (!login) {
      if (usernameIsInvalid || enteredValue.username === "") return;
      setIsLoading(true);
      setFormError("");
      await user
        .signUpEmail(
          enteredValue.email,
          enteredValue.password,
          enteredValue.username
        )
        .then((data) => {
          setFormError("");
          router.push(`/overview/${data}`);
        })
        .catch((err) => {
          setFormError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setFormError("");
      setIsLoading(true);
      await user
        .signInEmail(enteredValue.email, enteredValue.password)
        .then((data) => {
          router.push(`/overview/${data}`);
          setFormError("");
        })
        .catch((err) => {
          //console.log(err);
          setFormError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setFormError("");
    await user
      .SignInGoogle()
      .then((data) => {
        setFormError("");
        router.push(`/overview/${data}`);
      })
      .catch((err) => {
        setFormError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLoginMobile = async () => {
    setFormError("");
    await signInWithRedirect(auth, provider)
      .then(() => {
        setFormError("");
      })
      .catch((err) => {
        setFormError(err?.code || err?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Card className="md:mt-[4rem]">
      <h1 className="text-3xl">
        {login ? "Login to your Account" : "Create an account to get Started"}
      </h1>
      <ErrorMessage message={isErrorFromForm} />
      <>
        {login && (
          <SignInForm
            isLoading={isLoading}
            handleGoogle={handleGoogleLogin}
            submitForm={handleSubmit}
            email={enteredValue.email}
            mobilegoogleLogin={handleGoogleLoginMobile}
            onchangeInput={handleInputChange}
            password={enteredValue.password}
            handleBlurInput={handleInputEdit}
            inputError={{ emailIsInvalid, passwordIsInvalid }}
          />
        )}

        {!login && (
          <form onSubmit={handleSubmit} className="my-5 w-[90%] m-auto">
            <p className="font-semibold">UserName</p>
            <input
              type="text"
              onChange={(ev) => handleInputChange("username", ev.target.value)}
              value={enteredValue.username}
              onBlur={() => handleInputEdit("username")}
              placeholder="JOEY_1902"
              className={`block border-1 w-full border-solid mt-2 rounded border-black bg-slate-300
               placeholder:text-black px-3 py-4  focus:filter transition-all ${
                 usernameIsInvalid
                   ? "border-1 border-red-700 border-solid o"
                   : "outline-gray-400"
               } `}
            />
            <div className="error-text">
              {usernameIsInvalid &&
                `UserName cannot contain an empty space , ${invalidCharacter
                  .filter((val) => val !== " ")
                  .join(" , ")}`}
            </div>
            <p className="font-semibold">Email Address</p>
            <input
              onChange={(ev) => handleInputChange("email", ev.target.value)}
              value={enteredValue.email}
              type="email"
              onBlur={() => handleInputEdit("email")}
              placeholder="productmaker@gmail.com"
              className="block border-1 w-full border-solid my-5 rounded border-black bg-slate-300 placeholder:text-black
              px-3 py-4 focus:filter transition-all outline-gray-400"
            />
            <div className="error-text">
              {emailIsInvalid && "please enter a valid email Address"}
            </div>

            <p className="font-semibold">Password</p>
            <input
              onChange={(ev) => {
                handleInputChange("password", ev.target.value);
              }}
              value={enteredValue.password}
              type="password"
              onBlur={() => handleInputEdit("password")}
              placeholder="*********"
              className="block border-1 w-full border-solid my-5 rounded border-black bg-slate-300 placeholder:text-black
           px-3 py-4  focus:filter transition-all outline-gray-400"
            />

            <div className="error-text">
              {passwordIsInvalid && "Password length is too short"}
            </div>
            <button className="filled_large_btn_black w-full block px-1 focus:bg-slate-700 focus:text-white hover:text-black">
              {isLoading ? <LoaderText clr="text-white" /> : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="md:block hidden outline_large_btn_black w-full mt-5  px-1 hover:bg-white hover:text-black"
            >
              <Image
                className="m-auto inline mr-2"
                src={GoogleIcon}
                alt="google icon"
                height={20}
                width={20}
              />
              <span>Sign in with Google</span>
            </button>
            <button
              type="button"
              onClick={handleGoogleLoginMobile}
              className="md:hidden block outline_large_btn_black w-full mt-5  px-1 hover:bg-white hover:text-black"
            >
              <Image
                className="m-auto inline mr-2"
                src={GoogleIcon}
                alt="google icon"
                height={20}
                width={20}
              />
              <span>Sign in with Google</span>
            </button>
          </form>
        )}
      </>
      <button
        className="pl-8 mt-2 underline"
        onClick={() => {
          setFormError("");
          setLogin((p) => !p);
        }}
      >
        {login ? "Click here.. to Register" : "Click here..to login"}
      </button>
    </Card>
  );
};

export default AuthForm;
