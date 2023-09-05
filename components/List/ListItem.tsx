export type ListItemProps = {
  children?: React.ReactNode;
};
export const ListItem = ({ children }: ListItemProps) => {
  return <li className="group pb-2 px-4 py-2">{children}</li>;
};
