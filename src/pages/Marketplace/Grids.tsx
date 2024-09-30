import React from "react";
import { AssetGridBackedByFuel } from "assets";
import Button from "../../components/Button";
import { IconArrowRight, IconDiscord, IconGithub, IconSocial3Dots, IconX } from "../../icons";
import clsx from "clsx";
import { openInNewTab } from "../../utils";
import { HELP_CENTER_URL } from "../../global-constants";

const GridItem = ({ children, className }: any) => {
  return <div className={clsx("flex flex-col bg-bg-light border border-bg rounded-md p-5", className)}>{children}</div>;
};
const Grids = () => {
  return (
    <div className="container-fluid flex flex-col gap-5 mt-2.5 lg:mt-10">
      <div className="flex flex-col lg:flex-row gap-5">
        <GridItem className="flex-1 lg:max-w-[400px] h-[400px] pb-0">
          <div className="flex flex-col text-white gap-7">
            <h2 className="text-h2">Backed by Fuel</h2>
            <div className="body-large">Thunder is proudly backed by Fuel, our key investor.</div>
          </div>
          <div className="flex justify-end mt-10">
            <img src={AssetGridBackedByFuel} alt="backed-by-fuel" />
          </div>
        </GridItem>
        <GridItem className="flex-1 min-h-[480px] lg:min-h-0 bg-marketplace-fuel-network-bg bg-right bg-no-repeat bg-cover">
          <div className="flex flex-col text-white gap-7 max-w-[500px]">
            <h2 className="text-h2">The Superior NFT Experience on Fuel Network</h2>
            <div className="body-large">No more multi step signings. Thunder enables bulk executions in a single transaction.</div>
          </div>
        </GridItem>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <GridItem className="flex-1 min-h-[480px] lg:min-h-0 bg-audited-by-immunefi-bg bg-right-bottom bg-cover bg-no-repeat h-[400px]">
          <div className="flex flex-col text-white gap-7 max-w-[500px]">
            <h2 className="text-h2">Audited by Immunefi</h2>
            <div className="body-large">Thunder has been thoroughly audited by Immunefi, the leading bug bounty and security platform for Web3.</div>
            <div>
              <Button className="btn-secondary">
                READ <IconArrowRight />
              </Button>
            </div>
          </div>
        </GridItem>
        <div className="flex-1 lg:max-w-[400px] min-h-[400px] grid grid-cols-2 gap-5 text-white">
          <GridItem className="justify-between">
            <IconDiscord className="h-12 w-12" />
            <Button className="btn-secondary">
              Discord <IconArrowRight />
            </Button>
          </GridItem>
          <GridItem className="justify-between">
            <IconX className="h-12 w-12" />
            <Button className="btn-secondary">
              X <IconArrowRight />
            </Button>
          </GridItem>
          <GridItem className="justify-between">
            <IconSocial3Dots className="h-12 w-12" />
            <Button className="btn-secondary">
              medium <IconArrowRight />
            </Button>
          </GridItem>
          <GridItem className="justify-between">
            <IconGithub className="h-12 w-12" />
            <Button className="btn-secondary">
              Github <IconArrowRight />
            </Button>
          </GridItem>
        </div>
        <GridItem className="flex-1 flex-1 lg:max-w-[400px] min-h-[400px] lg:min-h-0 bg-get-help-bg bg-right-bottom bg-cover bg-no-repeat">
          <div className="flex flex-col text-white gap-7">
            <h2 className="text-h2">Get help</h2>
            <div className="body-large">Got questions or just wanna chat? We&apos;re always here to help you out!</div>
            <div className="">
              <Button
                className="btn-secondary"
                onClick={() => {
                  openInNewTab(HELP_CENTER_URL);
                }}
              >
                HELP CENTER <IconArrowRight />
              </Button>
              <Button
                className="btn-secondary mt-2"
                onClick={() => {
                  openInNewTab(CHAT_SUPPORT_URL);
                }}
              >
                CHAT SUPPORT <IconArrowRight />
              </Button>
            </div>
          </div>
        </GridItem>
      </div>
    </div>
  );
};

export default Grids;
