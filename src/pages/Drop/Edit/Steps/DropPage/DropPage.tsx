import React from "react";
import PageTitle from "../components/PageTitle";
import Container from "./components/Container";
import ModalProvider from "./modals/ModalContext";
import ModalEditDropPageTitle from "./modals/ModalEditDropPageTitle";
import ModalAddSocialMedias from "./modals/ModalAddSocialMedias";
import ModalAddTeamMember from "./modals/ModalAddTeamMember";
import ModalChangeBackgroundColor from "./modals/ModalChangeBackgroundColor";
import ModalAddMilestone from "./modals/ModalAddMilestone";
import ModalAddNewBlock from "./modals/ModalAddNewBlock";
import ModalAddInfinityScrollGalleryBlock from "./modals/ModalAddInfinityScrollGalleryBlock";
import ModalAddImageTextBlock from "./modals/ModalAddImageTextBlock";
import ModalAddVideoTextBlock from "./modals/ModalAddVideoTextBlock";
import ModalAddSingleImageBlock from "./modals/ModalAddSingleImageBlock";
import ModalAddSingleVideoBlock from "./modals/ModalAddSingleVideoBlock";

const DropPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-[500px] text-white">
        <PageTitle title="Drop Page" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>
      <ModalProvider>
        <Container />
        <ModalEditDropPageTitle show={false} />
        <ModalAddSocialMedias show={false} />
        <ModalAddTeamMember show={false} />
        <ModalChangeBackgroundColor show={false} />
        <ModalAddMilestone show={false} />
        <ModalAddNewBlock />
        <ModalAddInfinityScrollGalleryBlock />
        <ModalAddImageTextBlock />
        <ModalAddVideoTextBlock />
        <ModalAddSingleImageBlock />
        <ModalAddSingleVideoBlock />
      </ModalProvider>
    </div>
  );
};

export default DropPage;
