import React from "react";
import Button from "components/Button";
import { IconCirclePlusWhite, IconPencil } from "icons";
import Textarea from "components/Textarea";
import ModalEditDropPageTitle from "../modals/ModalEditDropPageTitle";
import ModalAddSocialMedias from "../modals/ModalAddSocialMedias";
import ModalAddTeamMember from "../modals/ModalAddTeamMember";
import ModalChangeBackgroundColor from "../modals/ModalChangeBackgroundColor";
import Tab from "./Tab";
import ModalAddMilestone from "../modals/ModalAddMilestone";
import ModalAddNewBlock from "../modals/ModalAddNewBlock";
import ModalAddInfinityScrollGalleryBlock from "../modals/ModalAddInfinityScrollGalleryBlock";
import ModalAddImageTextBlock from "../modals/ModalAddImageTextBlock";

const Container = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col rounded-lg border border-gray bg-gray p-8 gap-8">
        <div className="flex items-center justify-between">
          <div className="flex-center gap-4">
            <h2 className="text-white text-h2">Chungos</h2>
            <Button className="btn-icon">
              <IconPencil className="text-white opacity-50 hover:opacity-100" />
            </Button>
          </div>
        </div>
        <div className="px-5">
          <h3 className="text-h3 text-white">About</h3>
          <Textarea className="min-h-[400px]" containerClassName="mt-5 !border-white !border-opacity-10 max-w-[680px]">
            Welcome to the Chungos collection by Chungos on Thunder Marketplace
          </Textarea>
        </div>
        <div className="h-32 flex-center border border-dashed border-white text-white bg-white bg-opacity-10 rounded-lg">
          <div className="flex-center gap-2">
            <div className="text-headline-02">ADD NEW BLOCK</div>
            <IconCirclePlusWhite />
          </div>
        </div>
        <div>
          <Tab className="text-white">
            <Tab.Item title="Meet the Team">asdasd</Tab.Item>
            <Tab.Item title="Road Map">asdasd</Tab.Item>
            <Tab.Item title="FAQ">FAQ</Tab.Item>
          </Tab>
        </div>
      </div>
      <ModalEditDropPageTitle show={false} />
      <ModalAddSocialMedias show={false} />
      <ModalAddTeamMember show={false} />
      <ModalChangeBackgroundColor show={false} />
      <ModalAddMilestone show={false} />
      <ModalAddNewBlock show={false} />
      <ModalAddInfinityScrollGalleryBlock show={false} />
      <ModalAddImageTextBlock show={true} />
    </React.Fragment>
  );
};

export default Container;
