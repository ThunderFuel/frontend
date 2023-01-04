import React from "react";
import Modal from "../../../components/Modal";

export const EventThunderFuelGenericError = "ThunderFuelGenericError";

export const useErrorModal = (e: any) => {
  window.dispatchEvent(new CustomEvent(EventThunderFuelGenericError, { detail: e.message ?? e }));
};

const ErrorModal = () => {
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    const onDetectEvent = (e: any) => {
      setShow(true);
      setMessage(e.detail);
    };

    window.addEventListener(EventThunderFuelGenericError, onDetectEvent);

    return () => {
      window.removeEventListener(EventThunderFuelGenericError, onDetectEvent);
    };
  });

  return (
    <Modal title={"hata"} onClose={() => setShow(false)} show={show}>
      <div className="p-5">
        <h5 className="text-h5 text-white">{message}</h5>
      </div>
    </Modal>
  );
};

export default ErrorModal;
