"use client";
import { Label } from "@/components/Form/Label";

export type StyleSelectProps = {
  name?: string;
  recipeId?: number;
  label?: string;
  defaultValue?: any;
  value?: any;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  options?: Record<string | number, string | number>;
  //onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  action?: (data: any) => void;
};
export const StyleSelect = ({
  name,
  recipeId,
  label,
  children,
  options,
  disabled,
  defaultValue,
  action,
  value,
}: StyleSelectProps) => {
  const opts = options
    ? Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))
    : children;
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    console.log({ name, value, recipeId });
    if (action) action({ recipeId, styleId: parseInt(value) });
  };
  return (
    <Label label={label || name || ""}>
      <select
        disabled={disabled}
        className="block w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {opts}
      </select>
    </Label>
  );
};
