import React from "react";
import ModalBase from "./ModalBase";
import Label from "components/Label";
import UploadFile from "components/UploadFile";
import InputLabel from "components/InputLabel";
import Textarea from "components/Textarea";
import { IconDiscord, IconSocial3Dots, IconTelegram, IconTwitter } from "icons";
import Input from "components/Input";

const ModalAddTeamMember = (props: any) => {
  return (
    <ModalBase {...props} title="Add Team Member" footer={<ModalBase.Footer onClose={props.onClose}>Add TEAM MEMBER</ModalBase.Footer>}>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex flex-col gap-2">
          <Label helperText="100x100px recommended. PNG, GIF or JPEG. Max 20mb.">Avatar</Label>
          <UploadFile />
        </div>
        <InputLabel label="Name*" />
        <InputLabel label="Title*" />
        <div className="flex flex-col gap-2">
          <Label>About</Label>
          <Textarea />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Social</Label>
          <Input icon={<IconTwitter />} placeholder="@twitter_handle" />
          <Input icon={<IconDiscord />} placeholder="#discord_name" />
          <Input icon={<IconSocial3Dots />} placeholder="#/medium_url" />
          <Input icon={<IconTelegram />} placeholder="@telegram_username" />
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalAddTeamMember;
