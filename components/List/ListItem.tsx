export type ListItemProps = {
  children?: React.ReactNode;
};
export const ListItem = ({ children }: ListItemProps) => {
  return <li>{children}</li>;
};
