import { Label } from "./Label";

export type NumberFieldProps = {
  name: string;
  label?: string;
  defaultValue: any;
};
export const NumberField = ({
  name,
  label,
  defaultValue,
}: NumberFieldProps) => {
  return (
    <Label label={label || name}>
      <input
        className="block w-full"
        type="number"
        name={name}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
