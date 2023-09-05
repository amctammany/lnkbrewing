import Link from "next/link";
import { ListItem, ListItemProps } from "./ListItem";

export type ListItemButtonProps = ListItemProps & {
  href: string;
};
export const ListItemButton = ({ href, children }: ListItemButtonProps) => {
  return (
    <ListItem>
      <Link className="group" href={href}>
        {children}
      </Link>
    </ListItem>
  );
};
