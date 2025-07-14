import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavBarLink } from "./NavBarLink";
import SignInButton from "../SignInButton";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}
const menu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "Styles", url: "/styles" },
  {
    title: "Ingredients",
    url: "/ingredients",
    items: [{ title: "Hops", url: "/ingredients/hops" }],
  },
];
export function NavBar() {
  return (
    <div className="w-full border-b-2 p-4">
      <nav className="hidden lg:flex items-center justify-between gap-6">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tighter">
            LNK Brewing
          </Link>
        </div>
        <div className="flex items-center ">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-2">
          <SignInButton />
        </div>
      </nav>
    </div>
  );
}

function renderMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <NavBarLink href={item.url}>{item.title}</NavBarLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      prefetch={false}
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};
export default NavBar;
