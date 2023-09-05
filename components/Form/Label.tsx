export type LabelProps = {
  children?: React.ReactNode;
  label: string;
};
export const Label = ({ children, label }: LabelProps) => {
  return (
    <label className="block mb-4">
      <span className="text-gray-600 capitalize">{label}</span>
      {children}
    </label>
  );
};
