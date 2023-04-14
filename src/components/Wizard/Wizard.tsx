import React from "react";
import clsx from "clsx";
import Button from "../Button";
import { IconArrowRight, IconCircleCheck } from "icons";
import WizardProvider, { useWizard } from "./WizardContext";
import "./Wizard.css";

interface IStep {
  children: any;
  title: any;
  icon: any;
}

const Step = ({ children }: IStep) => {
  return <div className="p-10">{children}</div>;
};

const Header = () => {
  const { activeStepNumber, setActiveStepNumber, headerProps } = useWizard();
  const iconCheck = <IconCircleCheck className="text-green w-6 h-6" />;

  const onClick = (index: number) => {
    if (index < activeStepNumber) {
      setActiveStepNumber(index);
    }
  };

  return (
    <ul className={clsx("header", `grid-cols-${headerProps.length}`)}>
      {headerProps.map((header: any, index: number) => {
        const headerIcon = index < activeStepNumber ? iconCheck : header.icon;

        return (
          <li key={index} className={clsx(activeStepNumber === index && "active", activeStepNumber > index && "success")} onClick={() => onClick(index)}>
            {headerIcon}
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

const Wizard = ({ children, number = 0 }: any) => {
  const [activeStepNumber, setActiveStepNumber] = React.useState(number);
  const headerProps = children.map((child: any) => ({
    title: child.props.title,
    icon: child.props.icon,
  }));
  const getActiveStep = React.useMemo(() => {
    return children[activeStepNumber];
  }, [activeStepNumber]);

  return (
    <WizardProvider options={{ activeStepNumber, setActiveStepNumber, headerProps }}>
      <div className="flex flex-col flex-1">
        <div className="px-32 border-b border-gray">
          <div className="border-x border-gray">
            <Header />
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
