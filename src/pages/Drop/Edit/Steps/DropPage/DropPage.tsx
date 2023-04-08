import React from "react";
import PageTitle from "../components/PageTitle";
import Container from "./components/Container";

const DropPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-[500px] text-white">
        <PageTitle title="Drop Page" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </div>
      <Container />
    </div>
  );
};

export default DropPage;
