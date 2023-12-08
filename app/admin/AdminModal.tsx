"use client";

import { Button, Modal } from "@/components";
import { useClickAway } from "@/hooks";
import { useState } from "react";
export type AdminModalProps = {
  children: React.ReactNode;
};
export const AdminModal = ({ children }: AdminModalProps) => {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => setOpen(false));

  const handleToggle = () => setOpen((o) => !o);
  return (
    <>
      <Button onClick={handleToggle}>Open</Button>
      <Modal hidden={!open} close={() => setOpen(false)}>
        <div ref={ref}>{children}</div>
      </Modal>
    </>
  );
};
export default AdminModal;
