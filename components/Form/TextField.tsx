import { Label } from "./Label";

export type TextFieldProps = {
  name: string;
  label?: string;
  defaultValue: any;
};
export const TextField = ({ name, label, defaultValue }: TextFieldProps) => {
  return (
    <Label label={label || name}>
      <input
        className="block w-full"
        type="text"
        name={name}
        defaultValue={defaultValue}
      />
    </Label>
  );
};
