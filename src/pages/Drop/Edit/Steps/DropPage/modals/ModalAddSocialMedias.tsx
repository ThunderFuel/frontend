import React from "react";
import Modal from "./Modal";
import { IconDiscord, IconInfo, IconSocial3Dots, IconTelegram, IconTwitter, IconWeblink } from "icons";
import Label from "components/Label";
import Input from "components/Input";

const ModalAddSocialMedias = (props: any) => {
  return (
    <Modal {...props} title="Add Social Links" footer={<Modal.Footer />}>
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-gray rounded-md flex gap-5 items-center">
          <IconInfo className="text-white" />
          <span className="body-medium text-gray-light">Add your social links to help collectors verifying you.</span>
        </div>
        <div className="flex flex-col gap-2 text-gray-light">
          <Label className="text-white">Socials</Label>
          <Input icon={<IconTwitter />} />
          <Input icon={<IconDiscord />} placeholder="Add Discord Invite Link" />
          <Input icon={<IconSocial3Dots />} placeholder="Add Medium Link" />
          <Input icon={<IconTelegram />} placeholder="Add Telegram Invite Link" />
        </div>
        <div className="flex flex-col gap-2 text-gray-light">
          <Label className="text-white">Website</Label>
          <Input icon={<IconWeblink />} placeholder="yourwebsite.io" />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSocialMedias;
