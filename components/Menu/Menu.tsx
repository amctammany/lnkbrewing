"use client";
import { useClickAway } from "@/hooks";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export type MenuProps = {
  label: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Menu = ({ label, children }: MenuProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);
  const ref = useClickAway(() => setOpen(false));
  const menuClass = clsx(
    "absolute bg-gray-700 list-none float-left z-[1000] shadow-lg",
    {
      hidden: !open,
    }
  );
  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleOpen}
        className="flex items-center whitespace-nowrap  uppercase rounded bg-stone-500 px-6 py-2 font-medium text-xs"
      >
        {label}
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
      </button>
      <ul onClick={toggleOpen} className={menuClass}>
        {children}
      </ul>
    </div>
  );
};
