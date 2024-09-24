import React from "react";
import { IconLikeHand, IconTag } from "../../../icons";
import Modal from "../../../components/Modal";

const ModalBulkListing = ({ onClose, show }: any) => {
  return (
    <Modal bodyClassName="!w-full !max-w-[80%]" backdropDisabled={true} className="checkout" show={true} onClose={onClose}>
      <Modal.Tabs activeTab={0}>
        <Modal.TabItem headerIcon={IconTag} headerText="Bulk Listing">
          tab 1
        </Modal.TabItem>
        <Modal.TabItem headerIcon={IconLikeHand} headerText="Confirm Bulk Listing">
          tab 2
        </Modal.TabItem>
      </Modal.Tabs>
    </Modal>
  );
};

export default ModalBulkListing;
