"use client";

import { useModal } from "@/utils/Provider/ModalProvider";
import WhiteCard from "./whiteCard";
import { useState } from "react";
import Button from "@/UI/Button";

const FormResponse = ({ onclose, action, formCred, header }) => {
  return (
    <>
      <form onSubmit={action} className="leading-10">
        <h1 className="font-bold text-3xl mb-3">{header}</h1>
        {formCred.map((cred) => {
          {
            <div className="my-5">
              <label>{cred?.name}</label>
              <input
                className={`block border-1 w-full border-solid mt-2 rounded border-black bg-slate-300
                placeholder:text-black px-3 py-4  focus:filter transition-all outline-gray-400`}
                name={cred?.name}
                type={cred.type}
                maxLength={cred.maxLength}
              />
            </div>;
          }
        })}
        <Button>Submit</Button>
      </form>
      <Button className="mt-8" onClick={onclose}>
        Close
      </Button>
    </>
  );
};

const ConfirmResponse = ({ action, message, header }) => {
  return (
    <div className="leading-10">
      <h1 className="font-bold text-3xl mb-3">{header}</h1>
      <p className="mb-5 font-medium">{message}</p>
      <div className="flex gap-3">
        <Button onClick={onclose}>Close</Button>
        <Button onClick={action}>Confirm</Button>
      </div>
    </div>
  );
};
const MessageResponse = ({ onclose, header, message }) => {
  return (
    <div className="leading-10">
      <h1 className="font-bold text-3xl mb-3">{header}</h1>

      <p className="mb-5 font-medium">{message}</p>

      <Button onClick={onclose}>Close</Button>
    </div>
  );
};
export const ModalInfo = () => {
  const { toggleModalInfo, modalInfo } = useModal();
  const { header, action, formCred, message, isOpened } = modalInfo;
  //const [unknown_error, setError] = useState(null);

  return (
    <>
      {isOpened && (
        <>
          <div
            onClick={toggleModalInfo}
            className="backdrop-blur-lg fixed z-[1190] h-[100vh] bg-[rgba(0,0,0,0.5)]  top-0 w-full"
          ></div>

          <WhiteCard
            cls={`fixed z-[1200] h-fit w-[90%] md:w-[50%] left-[5%] md:left-[25%] py-5 top-[0%] md:top-[5%] my-[1rem] bg-white m-auto `}
          >
            {" "}
            {formCred && action && message && (
              <FormResponse
                action={action}
                onclose={toggleModalInfo}
                header={header}
                formCred={formCred}
              />
            )}
            {!formCred && action && message && (
              <ConfirmResponse
                action={action}
                onclose={toggleModalInfo}
                header={header}
                message={message}
              />
            )}
            {!formCred && message && !action && (
              <MessageResponse
                header={header}
                onclose={toggleModalInfo}
                message={message}
              />
            )}
          </WhiteCard>
        </>
      )}
    </>
  );
};

export default ModalInfo;
