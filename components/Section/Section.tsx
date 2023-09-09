export type SectionProps = {
  header?: string;
  icon?: string;
  actions?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
};

export const Section = ({ header, icon, actions, children }: SectionProps) => {
  return (
    <div className="min-w-full ">
      <div className="flex bg-slate-200 ">
        <div className="flex-shrink">{icon}</div>
        <h4 className="flex-grow text-lg font-bold py-2 px-4 m-0 border-red-300">
          {header}
        </h4>
        <div>{actions}</div>
      </div>

      <div className="bg-white p-2  shadow-lg">{children}</div>
    </div>
  );
};
