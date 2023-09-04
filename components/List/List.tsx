export type ListProps = {
  children?: React.ReactNode;
};
export const List = ({ children }: ListProps) => {
  return (
    <div className="flex-auto w-full m-2 p-2 bg-slate-400">
      <ul className="flex-grow ">{children}</ul>
    </div>
  );
};
