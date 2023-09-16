"use client";

import { Button, NewModal } from "@/components";
import { useEffect, useRef, useState } from "react";
export type AdminModalProps = {
  children: React.ReactNode;
};
export const AdminModal = ({ children }: AdminModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleClickAway = (e: any) => {
      // Click inside Menu
      if (ref.current?.contains(e.target)) return;
      console.log(ref.current);
      console.log(e.target);
      setOpen(false);
    };
    document.addEventListener("click", handleClickAway, true);
    return () => document.removeEventListener("click", handleClickAway, true);
  });

  const handleToggle = () => setOpen((o) => !o);
  return (
    <>
      <Button onClick={handleToggle}>Open</Button>
      <NewModal
        hidden={!open}
        menu={<Button onClick={() => setOpen(false)}>Close</Button>}
      >
        <div ref={ref}>{children}</div>
      </NewModal>
    </>
  );
};
export default AdminModal;
