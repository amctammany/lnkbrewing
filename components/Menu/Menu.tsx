"use client";
import { useClickAway } from "@/hooks";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { MenuIcon } from "../Icon";
import Button from "../Button/Button";

export type MenuProps = VariantProps<typeof menuStyles> & {
  label: string;
  children?: React.ReactNode | React.ReactNode[];
};
const menuStyles = cva(
  [
    "absolute list-none right-0 mt-0 py-0 w-48 rounded-lg shadow-xl z-20 [&>*:first-child)]:rounded-t-md [&>*:last-child]:rounded-b-md",
  ],
  {
    variants: {
      variant: {
        default: ["bg-white"],
        dark: ["bg-slate-400"],
      },
      anchor: {
        left: ["left-0"],
        right: ["right-0"],
      },
      open: {
        open: [],
        closed: "hidden",
      },
    },
    defaultVariants: {
      variant: "dark",
      anchor: "left",
      open: "closed",
    },
  }
);
const menuButtonStyles = cva(
  [
    "flex relative z-10 rounded-md p-2 bg-primary-500 text-gray-200  text-lg overflow-hidden  focus:outline-none focus:border-white",
    //"flex items-center whitespace-nowrap  uppercase rounded bg-stone-500 px-6 py-2 font-medium text-xs",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);
/**
        <span className="ml-2 w-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>

 */
export const Menu = ({ label, children, variant, anchor }: MenuProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);
  const ref = useClickAway(() => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <Button onClick={toggleOpen} className={menuButtonStyles({})}>
        <MenuIcon />
      </Button>
      <div
        onClick={toggleOpen}
        className={menuStyles({
          open: open ? "open" : "closed",
          variant,
          anchor,
        })}
      >
        {children}
      </div>
    </div>
  );
};
