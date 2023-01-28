import React from "react";

interface Props {
  onToggle: (isOn: boolean) => void;
  isOn: boolean;
}

const ToggleButton: React.FC<Props> = ({ onToggle, isOn }) => {
  const handleClick = () => {
    onToggle(!isOn);
  };

  return (
    <button className={`relative w-10 h-[26px] rounded-full cursor-pointer ${isOn ? "bg-white" : "bg-gray"}`} onClick={handleClick}>
      <span className={`absolute w-[18px] h-[18px] transition-all top-0 bottom-0 left-1 m-auto rounded-full ${isOn ? "translate-x-[14px] bg-bg" : " bg-gray-light"}`}></span>
    </button>
  );
};

export default ToggleButton;
