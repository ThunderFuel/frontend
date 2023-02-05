import React, { useEffect } from "react";
import Modal from "components/Modal";
import TabBase from "components/Tab";
import Button from "components/Button";
import Avatar from "../components/Avatar";
import { IconPlus } from "icons";

const ModalTitle = () => {
  return <h6 className="text-h5 text-white">Social</h6>;
};

const Tab = ({ initTab, onChange }: any) => {
  if (initTab === null) {
    return null;
  }

  return (
    <TabBase initTab={initTab} onChange={onChange}>
      <TabBase.Item id={0}>FOLLOWERS</TabBase.Item>
      <TabBase.Item id={1}>FOLLOWING</TabBase.Item>
    </TabBase>
  );
};

const ModalSocial = ({ show, onClose, followers, follows, initialTab = 0 }: any) => {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const activeItems = [followers, follows];
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <Modal show={show} onClose={onClose} title="Social" modalTitle={<ModalTitle />} bodyClassName="!w-[480px]">
      <div className="flex flex-col p-5 gap-5">
        <Tab initTab={activeTab} onChange={setActiveTab} />
        <div className="flex flex-col w-full gap-2">
          {activeItems?.[activeTab]?.map((item: any, k: number) => {
            return (
              <div key={k} className="flex w-full items-center justify-between border border-gray rounded-md py-3 px-2">
                <div className="flex items-center gap-2">
                  <Avatar image={item.image} className="w-8 h-8" />
                  <div>
                    <h6 className="text-h6 text-white">{item.userName}</h6>
                    <div className="text-headline-01 text-gray-light mt-2">{item.followerCount} FOLLOWERS</div>
                  </div>
                </div>
                <Button className="btn-secondary btn-sm !bg-white !text-black">
                  FOLLOW <IconPlus />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSocial;
