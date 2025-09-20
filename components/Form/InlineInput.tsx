import * as React from "react";

import { cn } from "@/lib/utils";
import { Signal } from "lucide-react";
import { cx } from "class-variance-authority";
export type InlineInputProps = React.ComponentProps<"input"> & {
  prepend?: React.FC<any>;
  append?: React.FC<any>;
};
function InlineInput({
  className,
  type,
  prepend: Pre,
  append: App,
  ...props
}: InlineInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cx(
          " text-center px-3 py-2 border rounded-lg w-full",
          Pre && "pl-10",
          App && "pr-10"
        )}
        {...props}
      />
      <div
        className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
      >
        {Pre && <Pre width="8" height="8" className="w-5 h-5" />}
      </div>
      <div
        className="absolute inset-y-0 right-0 pr-3 
                    flex items-center 
                    pointer-events-none"
      >
        {App && <App width="8" height="8" className="w-5 h-5" />}
      </div>
    </div>
  );
}

export { InlineInput };
