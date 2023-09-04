export type ListItemProps = {
  children?: React.ReactNode;
};
export const ListItem = ({ children }: ListItemProps) => {
  return <li className="px-4 py-2">{children}</li>;
};
