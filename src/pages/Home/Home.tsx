import React from "react";
import { IconArrowRight } from "../../icons";
import Button from "../../components/Button";

const Home = () => {
  return (
    <div className="flex gap-4 p-5">
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
    </div>
  );
};

export default Home;
