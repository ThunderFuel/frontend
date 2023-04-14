import React, { createContext, useContext } from "react";

export const EventWizardSubmit = "EventWizardSubmit";

export const WizardContext = createContext<any>({} as any);
const WizardProvider = ({ children, options }: any) => {
  const onNextStep = () => {
    options.setActiveStepNumber((prevState: any) => prevState + 1);
  };
  const onPrevStep = () => {
    options.setActiveStepNumber((prevState: any) => prevState - 1);
  };

  const onSubmit = () => {
    window.dispatchEvent(new CustomEvent(EventWizardSubmit));
  };

  const value = {
    ...options,
    onNextStep,
    onPrevStep,
    onSubmit,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};

export default WizardProvider;

export const useWizard = () => useContext(WizardContext);
