import React from "react";
import Button from "components/Button";
import { IconPencil } from "icons";

const Container = () => {
  return (
    <div className="flex flex-col rounded-5 border border-gray bg-gray p-8 gap-8">
      <div className="flex items-center justify-between">
        <div className="flex-center gap-4">
          <h2 className="text-white text-h2">Chungos</h2>
          <Button className="btn-icon">
            <IconPencil className="text-white opacity-50 hover:opacity-100" />
          </Button>
        </div>
      </div>
      <div>asdasd</div>
    </div>
  );
};

export default Container;
