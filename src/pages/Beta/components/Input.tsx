import React from "react";
import "./Input.css";
import clsx from "clsx";

const KeyBackspace = "Backspace";
const Input = ({ value, onChange, ...etc }: any) => {
  return (
    <input
      {...etc}
      className={clsx("beta-input", value && "entered")}
      value={value}
      onKeyDown={(e) => {
        if ([KeyBackspace].includes(e.key)) {
          return onChange(e.key);
        }
        if (Number(e.key)) {
          onChange(e.key);
        }
      }}
    />
  );
};

const isNumber = function isNumber(value: any) {
  if (typeof value === "number" && isFinite(value)) {
    return value;
  }

  return "";
};

const InputContainer = ({ onChangeContainer }: any) => {
  const codeArray = [0, 1, 2, 3, 4, 5];
  const [codes, setCodes] = React.useReducer(
    (prevState: any, nextState: any) => {
      return { ...prevState, ...nextState };
    },
    { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" }
  );

  React.useEffect(() => {
    const onPaste = async (e: any) => {
      try {
        const clipText = e.clipboardData.getData("Text").split("");
        codeArray.forEach((i) => {
          setCodes({ [i]: isNumber(clipText[i]) });
        });
      } catch (e) {
        console.log(e);
      }
    };

    document.addEventListener("paste", onPaste);

    return () => {
      document.removeEventListener("paste", onPaste);
    };
  });

  const getInputList = (index: any) => {
    return document.querySelectorAll(".beta-input")[index];
  };

  const onChangeInput = (i: number, value: any) => {
    const inputValue = KeyBackspace === value ? "" : value;

    setCodes({ [i]: inputValue });

    if (value === KeyBackspace) {
      (getInputList(i - 1) as HTMLInputElement)?.focus();
    } else if (value) {
      (getInputList(i + 1) as HTMLInputElement)?.focus();
    }
  };

  React.useEffect(() => {
    onChangeContainer(
      Object.values(codes)
        .filter((code) => !!code)
        .join("")
    );
  }, [codes]);

  return (
    <div className="grid grid-cols-6 gap-2">
      {codeArray.map((i) => (
        <Input key={i} value={codes[i]} onChange={(value: any) => onChangeInput(i, value)} maxLength={1} />
      ))}
    </div>
  );
};

export default InputContainer;
