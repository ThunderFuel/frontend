import React from "react";
import { PATHS } from "../../../../router/config/paths";
import TabBase from "components/Tab";
import { useLocation, useNavigate } from "react-router-dom";

const Tab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [initTab, setInitTab] = React.useState<any>(location.pathname);
  const onChange = (value: any) => {
    if (value) {
      navigate(value);
    }
  };

  React.useEffect(() => {
    setInitTab(location.pathname);
  }, [location]);

  return (
    <TabBase initTab={initTab} className="hidden lg:flex" onChange={onChange}>
      <TabBase.Item id={PATHS.MARKETPLACE}>EXPLORE</TabBase.Item>
      <TabBase.Item id={PATHS.RANKINGS}>COLLECTIONS</TabBase.Item>
      <TabBase.Item id={null} className="group relative" disabled>
        DROP
        <div className="group-hover:opacity-100 transition-opacity duration-500 ease-out opacity-0 absolute top-[45px] -left-5 w-28 tracking-[0.2em] text-headline-01 text-white bg-gray rounded-full text-center px-2 py-2.5">
          COMING SOON
        </div>
      </TabBase.Item>
      <TabBase.Item id={null} className="group relative" disabled>
        CREATE
        <div className="group-hover:opacity-100 transition-opacity duration-500 ease-out opacity-0 absolute top-[45px] -left-3 w-28 tracking-[0.2em] text-headline-01 text-white bg-gray rounded-full text-center px-2 py-2.5">
          COMING SOON
        </div>
      </TabBase.Item>
    </TabBase>
  );
};

export default Tab;
