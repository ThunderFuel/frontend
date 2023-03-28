import React from "react";
import clsx from "clsx";
import Button from "../Button";
import { IconArrowRight } from "icons";
import WizardProvider, { useWizard } from "./WizardContext";

interface IStep {
  children: any;
  title: any;
  icon: any;
}

const Step = ({ children }: IStep) => {
  return <div className="p-10">{children}</div>;
};

const Header = ({ headerProps, activeStepNumber }: any) => {
  return (
    <ul className={clsx("grid justify-between divide-x divide-gray", `grid-cols-${headerProps.length}`)}>
      {headerProps.map((header: any, index: number) => {
        return (
          <li key={index} className={clsx("p-6 flex gap-4", activeStepNumber === index ? "text-white" : "text-gray-light")}>
            {header.icon}
            <div className={clsx("text-h6")}>{header.title}</div>
          </li>
        );
      })}
    </ul>
  );
};
const Footer = () => {
  const { onSubmit } = useWizard();

  return (
    <div className="sticky bottom-0 bg-bg px-32 border-t border-gray">
      <div className="flex justify-end border-x border-gray p-5 gap-2.5">
        <Button className="btn-secondary btn-sm" onClick={onSubmit}>
          contınue <IconArrowRight />
        </Button>
      </div>
    </div>
  );
};

const Wizard = ({ children }: any) => {
  const [activeStepNumber, setActiveStepNumber] = React.useState(0);
  const headerProps = children.map((child: any) => ({
    title: child.props.title,
    icon: child.props.icon,
  }));
  const getActiveStep = React.useMemo(() => {
    console.log(activeStepNumber);

    return children[activeStepNumber];
  }, [activeStepNumber]);

  return (
    <WizardProvider options={{ activeStepNumber, setActiveStepNumber }}>
      <div className="flex flex-col flex-1">
        <div className="px-32 border-b border-gray">
          <div className="border-x border-gray">
            <Header headerProps={headerProps} activeStepNumber={activeStepNumber} />
          </div>
        </div>
        <div className="px-32 flex flex-1">
          <div className="border-x border-gray flex-1">{getActiveStep}</div>
        </div>
        <Footer />
      </div>
    </WizardProvider>
  );
};

export default Object.assign(Wizard, { Step });
