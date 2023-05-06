import React from "react";
import Modal from "./Modal";
import InputLabel from "components/InputLabel";
import Alert from "../components/Alert";

const ModalChangeBackgroundColor = (props: any) => {
  return (
    <Modal {...props} title="Change Background Color" footer={<Modal.Footer />}>
      <div className="flex flex-col gap-6 text-white">
        <Alert>You can customize the background color of your drop page to match your brand. It’s important to consider that the color contrast ratio to maintain the page&#39;s readability.</Alert>
        <InputLabel label="Select Background Color*" />
      </div>
    </Modal>
  );
};

export default ModalChangeBackgroundColor;
