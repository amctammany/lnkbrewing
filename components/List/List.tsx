export type ListProps = {
  children?: React.ReactNode;
};
export const List = ({ children }: ListProps) => {
  return <ul>{children}</ul>;
};
