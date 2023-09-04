import Link from "next/link";
export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className="block text-center py-2 px-4 font-bold hover:text-red-500"
      >
        {children}
      </Link>
    </li>
  );
};
