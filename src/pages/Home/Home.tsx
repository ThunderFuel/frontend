import React from "react";
import { IconArrowRight } from "../../icons";
import Button from "../../components/Button";
import Tab from "../../components/Tab";
import ButtonWallet from "../../components/ButtonWallet";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onChange = () => {};

  return (
    <div className="flex gap-4 p-5 flex-col">
      <div>
        <Button>
          PRIMARY DEFAULT
          <IconArrowRight />
        </Button>
      </div>
      <div>
        <Button className="btn-secondary">
          PRIMARY DEFAULT
          <IconArrowRight />
        </Button>
      </div>
      <div>
        <Button className="btn-secondary btn-sm">
          PRIMARY DEFAULT
          <IconArrowRight />
        </Button>
      </div>

      <div>
        <Tab initTab={1} onChange={onChange}>
          <Tab.Item id={1}>Default</Tab.Item>
          <Tab.Item id={2}>Default</Tab.Item>
          <Tab.Item id={3}>Default</Tab.Item>
        </Tab>
      </div>
      <div>
        <Tab className="flex-col gap-5" initTab={1} onChange={onChange}>
          <Tab.Item id={1}>Default</Tab.Item>
          <Tab.Item id={2}>Default</Tab.Item>
          <Tab.Item id={3}>Default</Tab.Item>
        </Tab>
      </div>
      <div>
        <ButtonWallet>CONNECT WALLET</ButtonWallet>
      </div>
    </div>
  );
};

export default Home;
