import React from "react";
import Tab from "components/Tab";
import Button from "components/Button";
import { IconArrowRight } from "icons";
import { PATHS } from "router/config/paths";
import UseNavigate from "hooks/useNavigate";
import { Outlet } from "react-router-dom";
import "../../pages/Landing/Slider/Slider.css";
import ModalImportCollection from "./components/ModalImportCollection";

const Create = () => {
  const navigate = UseNavigate();
  const [showModal, setshowModal] = React.useState(false);
  let initTab = PATHS.CREATE_OVERVIEW;

  if (location.pathname.search(PATHS.CREATE_COLLECTIONS) > -1) {
    initTab = PATHS.CREATE_COLLECTIONS;
  } else if (location.pathname.search(PATHS.CREATE_COLLECTORS) > -1) initTab = PATHS.CREATE_COLLECTORS;

  return (
    <div className="flex flex-col">
      <ModalImportCollection show={showModal} onClose={() => setshowModal(false)} />
      <header className="container border-x border-gray">
        <div className="slider-container-create">
          <div className="container-fluid relative z-10 flex flex-col">
            <h1 className="text-h1 mt-7">Create with Thunder</h1>
            <div className="text-bodyMd mt-7 lg:w-[560px] text-gray-light ">Welcome to your creater dashboard! You can create and sell your work with ease using the power of Thunder!</div>
          </div>
        </div>
      </header>
      <div className="border-t border-b border-gray">
        <div className="container border-r border-gray">
          <Tab
            initTab={initTab}
            className="secondary -my-[1px] w-fit"
            onChange={(item) => {
              navigate(item);
            }}
          >
            <Tab.Item id={PATHS.CREATE_OVERVIEW}>Overview</Tab.Item>
            <Tab.Item id={PATHS.CREATE_COLLECTIONS}>Collections</Tab.Item>
            <Tab.Item id={PATHS.CREATE_COLLECTORS}>Collectors</Tab.Item>
          </Tab>
        </div>
      </div>
      <div className="container flex flex-col gap-5 p-10 text-white border-x border-gray">
        <Outlet />
        <div className="flex justify-between border border-gray rounded-lg p-5">
          <div className="flex flex-col gap-2">
            <div className="text-head5 font-spaceGrotesk text-white">Do you own a collection?</div>
            <div className="text-bodyMd font-spaceGrotesk text-gray-light">You can import your collections with contract address to manage with Thunder.</div>
          </div>
          <Button className="btn-secondary w-fit" onClick={() => setshowModal(true)}>
            IMPORT YOUR COLLECTION <IconArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
