import Link from "next/link";
import React from "react";
export interface NavBarLinkProps {
  href: string;
  children: React.ReactNode;
}
export const NavBarLink: React.FC<NavBarLinkProps> = ({ href, children }) => {
  return <Link href={href}>{children}</Link>;
};
