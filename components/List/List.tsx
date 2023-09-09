export type ListProps = {
  children?: React.ReactNode;
};
export const List = ({ children }: ListProps) => {
  return (
    <div className="flex w-full m-2 p-2 bg-white">
      <ul className="flex-grow divide-y divide-blue-500">{children}</ul>
    </div>
  );
};
