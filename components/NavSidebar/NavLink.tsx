"use client";
import Link, { LinkProps } from "next/link";
import React, { ComponentProps } from "react";
import { useSidebar } from "../ui/sidebar";

export interface NavLinkProps extends ComponentProps<"a"> {
  href: string;
}
export function NavLink(props: NavLinkProps) {
  const { setOpenMobile } = useSidebar();
  const handleClick = () => {
    setOpenMobile(false);
  };
  return <Link {...props} onClick={handleClick} />;
}

export default NavLink;
