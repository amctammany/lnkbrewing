import { Label } from "./Label";

export type SelectProps = {
  name: string;
  label?: string;
  defaultValue: any;
  children?: React.ReactNode | React.ReactNode[];
};
export const Select = ({
  name,
  label,
  children,
  defaultValue,
}: SelectProps) => {
  return (
    <Label label={label || name}>
      <select className="block w-full" name={name} defaultValue={defaultValue}>
        {children}
      </select>
    </Label>
  );
};
