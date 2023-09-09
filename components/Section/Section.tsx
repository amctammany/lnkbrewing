export type SectionProps = {
  header?: string;
  icon?: string;
  actions?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
};

export const Section = ({ header, icon, actions, children }: SectionProps) => {
  return (
    <div className="flex-auto">
      <div className="flex bg-slate-100 ">
        <div className="flex-shrink">{icon}</div>
        <h4 className="flex-grow text-lg font-bold py-2 px-4 m-0 border-red-300">
          {header}
        </h4>
        <div>{actions}</div>
      </div>

      <div>{children}</div>
    </div>
  );
};
