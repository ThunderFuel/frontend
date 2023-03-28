import React from "react";
import Wizard from "components/Wizard";
import { IconCalendar, IconCrop, IconPaperCode, IconPencilRuler } from "icons";
import Details from "./Steps/Details";
import Schedule from "./Steps/Schedule";

const Edit = () => {
  return (
    <Wizard number={1}>
      <Wizard.Step title={"Drop Details"} icon={<IconCrop />}>
        <Details />
      </Wizard.Step>
      <Wizard.Step title={"Drop Schedule"} icon={<IconCalendar />}>
        <Schedule />
      </Wizard.Step>
      <Wizard.Step title={"Metadata"} icon={<IconPaperCode />}>
        3
      </Wizard.Step>
      <Wizard.Step title={"Drop Page"} icon={<IconPencilRuler />}>
        4
      </Wizard.Step>
    </Wizard>
  );
};

export default Edit;
