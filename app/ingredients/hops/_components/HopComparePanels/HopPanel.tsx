import { Hop } from "@prisma/client";

export type HopPanelProps = {
  hop?: Hop;
};
const Prop: React.FC<{
  label?: string | React.ReactNode;
  children: React.ReactNode;
}> = ({ label, children }) => {
  const body = children ?? label;
  return <div>{body}</div>;
};
const props: (keyof Hop)[] = ["name", "alpha", "beta", "cohumulone"];
export function HopPanel({ hop }: HopPanelProps) {
  return (
    <div className="grid grid-flow-row auto-rows-auto">
      {props.map((prop) => (
        <Prop key={prop} label={prop}>
          {hop?.[prop]}
        </Prop>
      ))}
    </div>
  );
}

export default HopPanel;
