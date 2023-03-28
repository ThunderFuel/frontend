import React from "react";

interface Props {
  onToggle: () => void;
  isOn?: boolean;
}

const ToggleButton = ({ onToggle, isOn }: Props) => {
  const [isChecked, setIsChecked] = React.useState(isOn);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
    onToggle();
  };

  return (
    <button className={`relative w-10 h-[26px] rounded-full cursor-pointer ${isChecked ? "bg-white" : "bg-gray"}`} onClick={handleClick}>
      <span className={`absolute w-[18px] h-[18px] transition-all top-0 bottom-0 left-1 m-auto rounded-full ${isChecked ? "translate-x-[14px] bg-bg" : " bg-gray-light"}`}></span>
    </button>
  );
};

export default ToggleButton;
