import { optional } from "zod";
import { Label } from "./Label";

export type SelectProps = {
  name: string;
  label?: string;
  defaultValue: any;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
};
export const Select = ({
  name,
  label,
  children,
  options,
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
      <select className="block w-full" name={name} defaultValue={defaultValue}>
        {opts}
      </select>
    </Label>
  );
};
