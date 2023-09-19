import { optional } from "zod";
import { Label } from "./Label";

export type SelectProps = {
  name: string;
  label?: string;
  defaultValue: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
};
export const Select = ({
  name,
  label,
  children,
  options,
  disabled,
  defaultValue,
}: SelectProps) => {
  const opts = options
    ? Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))
    : children;
  return (
    <Label label={label || name}>
      <select
        disabled={disabled}
        className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        name={name}
        defaultValue={defaultValue}
      >
        {opts}
      </select>
    </Label>
  );
};
