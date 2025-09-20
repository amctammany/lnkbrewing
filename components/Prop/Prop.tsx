export type PropProps = {
  label: string | React.ReactNode;
  value?: string | number | null | React.ReactNode;
  unit?: string | React.ReactNode;
  children?: string | number | null | React.ReactNode;
};
export const Prop = ({ label, value, unit, children }: PropProps) => {
  return (
    <div className="*:block md:*:flex md:flex align-text-bottom  py-2">
      <span className="leading-6 my-auto font-mono font-bold text-gray-700 px-2 shrink min-w-32">
        {label}:
      </span>
      <span className="my-auto leading-6 px-2 font-mono grow border-b-2">
        {children ?? value}
        <span className="pl-1">{unit}</span>
      </span>
    </div>
  );
};
