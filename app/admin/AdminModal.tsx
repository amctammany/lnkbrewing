"use client";

import { Button } from "@/components";
import dynamic from "next/dynamic";
import { useState } from "react";
const NewModal = dynamic(() => import("@/components/NewModal/NewModal"), {
  ssr: false,
});
export type AdminModalProps = {
  children: React.ReactNode;
};
export const AdminModal = ({ children }: AdminModalProps) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((o) => !o);
  return (
    <>
      <Button onClick={handleToggle}>Open</Button>
      <NewModal hidden={open} onClose={handleToggle}>
        {children}
      </NewModal>
    </>
  );
};
export default AdminModal;
