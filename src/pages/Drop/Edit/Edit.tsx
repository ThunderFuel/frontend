import React from "react";
import Wizard from "components/Wizard";
import { IconCalendar, IconCrop, IconPaperCode, IconPencilRuler } from "icons";
import Details from "./Steps/Details";
import Schedule from "./Steps/Schedule/Schedule";
import Metadata from "./Steps/Metadata";
import DropPage from "./Steps/DropPage";

const Edit = () => {
  return (
    <Wizard number={3}>
      <Wizard.Step title={"List Details"} icon={<IconCrop />}>
        <Details />
      </Wizard.Step>
      <Wizard.Step title={"List Schedule"} icon={<IconCalendar />}>
        <Schedule />
      </Wizard.Step>
      <Wizard.Step title={"Metadata"} icon={<IconPaperCode />}>
        <Metadata />
      </Wizard.Step>
      <Wizard.Step title={"List Page"} icon={<IconPencilRuler />}>
        <DropPage />
      </Wizard.Step>
    </Wizard>
  );
};

export default Edit;
