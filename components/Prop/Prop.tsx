export type PropProps = {
  label?: string | null;
  value?: string | number | null;
  unit?: string | null;
};
export const Prop = ({ label, value, unit }: PropProps) => {
  return (
    <div className="flex">
      <h4 className="flex-grow text-md font-bold">{label}</h4>
      <span className="pr-1">{value}</span>
      <span className="">{unit}</span>
    </div>
  );
};
export default Prop;
