import React from "react";
import Button from "components/Button";
import { IconCirclePlusWhite, IconPencil } from "icons";
import Textarea from "components/Textarea";
import Tab from "./Tab";
import { ModalNames, useModalContext } from "../modals/ModalContext";

const Container = () => {
  const modal = useModalContext();
  const onAddNewBlock = () => {
    modal.showModal(ModalNames.ModalAddNewBlock);
  };

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
          <div className="flex-center gap-2" onClick={onAddNewBlock}>
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
    </React.Fragment>
  );
};

export default Container;
