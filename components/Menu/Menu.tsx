"use client";
import { useState, useRef, useEffect } from "react";

export type MenuProps = {
  label: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const Menu = ({ label, children }: MenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((v) => !v);
  useEffect(() => {
    const handleClickAway = (e: any) => {
      // Click inside Menu
      if (ref.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("click", handleClickAway, true);
    return () => document.removeEventListener("click", handleClickAway, true);
  });
  const menuClass = open
    ? "absolute list-none float-left z-[1000]"
    : "absolute hidden list-none float-left z-[1000]";
  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggleOpen}
        className="flex items-center whitespace-nowrap rounded bg-stone-500 px-6 py-2 font-medium text-xs"
      >
        {label}
      </button>
      <ul className={menuClass}>{children}</ul>
    </div>
  );
};
