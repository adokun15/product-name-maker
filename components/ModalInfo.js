"use client";

import { useModal } from "@/utils/Provider/ModalProvider";
import WhiteCard from "./whiteCard";
import { useState } from "react";
import Button from "@/UI/Button";

import { useFormState } from "react";

const FormResponse = ({ onclose, action, formCred, header }) => {
  return (
    <>
      <form onSubmit={action}>
        <h1>{header}</h1>
        {formCred.map((cred) => {
          {
            cred.entries((title, obj) => {
              <>
                <label>{title}</label>
                <input name={title} type={obj.type} maxLength={obj.maxLength} />
              </>;
            });
          }
        })}
        <Button>Submit</Button>
      </form>
      <Button onClick={onclose}>Close</Button>
    </>
  );
};

const ConfirmResponse = ({ action, message, header }) => {
  return (
    <div>
      <h1>{header}</h1>

      <p>{message}</p>

      <div>
        <Button onClick={onclose}>Close</Button>
        <Button onClick={action}>Confirm</Button>
      </div>
    </div>
  );
};
const MessageResponse = ({ onclose, header, message }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-3">{header}</h1>

      <p>{message}</p>

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
            cls={`fixed z-[1200] h-fit w-[90%] md:w-[70%] left-[15%] py-5 top-[0%] md:top-[5%] my-[1rem] bg-white m-auto `}
          >
            {" "}
            {formCred && action && !message && (
              <FormResponse
                action={action}
                onclose={toggleModalInfo}
                header={header}
                fromCred={formCred}
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
