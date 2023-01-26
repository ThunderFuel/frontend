import * as React from "react";
import { IconArrowDown } from "icons";
import { useClickOutside } from "hooks/useClickOutside";

interface Props {
  className?: string;
  options: string[];
  onSelect: (event: any) => void;
}

const Dropdown: React.FC<Props> = ({ className, options, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const ref = React.useRef(null);
  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (event: any) => {
    setSelectedOption(event.currentTarget.textContent || "");
    onSelect(event.target.value);
    setIsOpen(false);
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div ref={ref} className={`flex flex-col w-full`}>
      <button className={`flex justify-between w-full p-4 border border-gray rounded-lg bg-bg-light ${className}`} onClick={toggleIsOpen}>
        {selectedOption}
        <IconArrowDown />
      </button>
      {isOpen && (
        <div className="mt-1">
          <ul className=" flex flex-col w-full rounded-lg border border-gray bg-bg-light">
            {options.map((option, index) => (
              <li key={index} className="pl-4 cursor-pointer border-b border-gray hover:bg-gray first:rounded-t-lg last:rounded-b-lg last:border-none">
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
