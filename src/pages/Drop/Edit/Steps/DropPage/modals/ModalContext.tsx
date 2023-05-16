import React, { createContext, ReactNode, useContext, useState } from "react";

interface IModalContext {
  closeAll: any;
  showModal: any;
  closeModal: any;
  activeModal: any;
}

export const ModalContext = createContext<IModalContext>({} as any);

export enum ModalNames {
  ModalAddNewBlock,
  ModalAddSingleImageBlock,
  ModalAddSocialMedias,
  ModalAddImageTextBlock,
  ModalAddInfinityScrollGalleryBlock,
  ModalAddMilestone,
  ModalAddTeamMember,
  ModalAddSingleVideoBlock,
  ModalAddVideoTextBlock,
  ModalChangeBackgroundColor,
  ModalEditDropPageTitle,
}

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<any>({});
  const showModal = (name: any) => {
    closeAll();
    setActiveModal({ [name]: true });
  };
  const closeModal = (name: any) => {
    setActiveModal({ [name]: false });
  };

  const closeAll = () => {
    setActiveModal({});
  };

  const contextValue = {
    showModal,
    closeModal,
    closeAll,
    activeModal,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
export const useModalContext = () => useContext(ModalContext);
