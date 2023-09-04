import Link from "next/link";

export type ListItemButtonProps = {
  href: string;
  children?: React.ReactNode;
};
export const ListItemButton = ({ href, children }: ListItemButtonProps) => {
  return (
    <Link href={href}>
      <li className="px-4 py-2">{children}</li>
    </Link>
  );
};
