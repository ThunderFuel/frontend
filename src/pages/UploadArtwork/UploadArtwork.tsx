import React from "react";
import Wizard from "components/Wizard";
import { IconSettings, IconToken, IconUpload } from "icons";
import Artwork from "./pages/Artwork";

const UploadArtwork = () => {
  return (
    <Wizard>
      <Wizard.Step title={"Artwork"} icon={<IconUpload />}>
        <Artwork />
      </Wizard.Step>
      <Wizard.Step title={"Additional Settings"} icon={<IconSettings />}>
        2
      </Wizard.Step>
      <Wizard.Step title={"Mint"} icon={<IconToken />}>
        3
      </Wizard.Step>
    </Wizard>
  );
};

export default UploadArtwork;
