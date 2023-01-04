import React from "react";
import Modal from "../../../components/Modal";

export const EventThunderFuelGenericError = "ThunderFuelGenericError";
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
      {message}
    </Modal>
  );
};

export default ErrorModal;
