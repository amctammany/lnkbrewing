import Link from "next/link";
export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="inline-block text-center py-2 px-4 my-1 mx-4 font-bold hover:text-red-500"
    >
      {children}
    </Link>
  );
};
