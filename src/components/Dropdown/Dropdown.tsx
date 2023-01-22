import * as React from "react";
import { IconArrowDown } from "icons";

interface Props {
  className?: string;
  options: string[];
  onSelect: (event: any) => void;
}

const Dropdown: React.FC<Props> = ({ className, options, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleSelect = (event: React.MouseEvent<HTMLOptionElement>) => {
    setSelectedOption(event.currentTarget.textContent || "");
    onSelect(event);
    setIsOpen(false);
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`flex flex-col w-full border border-gray rounded-lg ${className}`}>
      <button className="flex justify-between w-full p-4" onClick={toggleIsOpen}>
        {selectedOption}
        <IconArrowDown />
      </button>

      {isOpen && (
        <div className="relative">
          <ul className="absolute flex flex-col w-full  bg-bg rounded-lg border border-gray">
            {options.map((option, index) => (
              <li key={index} className="pl-4 cursor-pointer border-b border-gray  hover:bg-gray first:rounded-t-lg last:rounded-b-lg last:border-none">
                <option className="flex w-full py-1" onClick={handleSelect}>
                  {option}
                </option>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
