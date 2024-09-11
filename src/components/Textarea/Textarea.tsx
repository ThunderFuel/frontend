import React from "react";
import clsx from "clsx";
import InputError from "../InputError";

interface ITextarea {
  icon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  children?: string;
  error?: string;

  [key: string]: any;
}

// ForwardRefRenderFunction type is defined to handle the props and ref correctly
const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(({ className, containerClassName, icon, error, ...etc }, ref) => {
  return (
    <>
      <div className={clsx("input-container flex flex-row items-center gap-2 p-4", "w-full lg:border lg:rounded lg:border-gray", containerClassName)}>
        <textarea ref={ref} className={clsx("input peer resize-none", className)} {...etc}></textarea>
        {icon}
      </div>
      {error && <InputError error={error} />}
    </>
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
