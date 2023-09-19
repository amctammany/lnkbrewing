import { Label } from "./Label";

export type NumberFieldProps = {
  name: string;
  label?: string;
  defaultValue: any;
  step?: number;
};
export const NumberField = ({
  name,
  label,
  step,
  defaultValue,
}: NumberFieldProps) => {
  return (
    <Label label={label || name}>
      <input
        className="block w-full"
        type="number"
        step={step || 1}
        name={name}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
