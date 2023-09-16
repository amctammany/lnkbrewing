"use client";

import { Button, NewModal } from "@/components";
import { useClickAway } from "@/hooks";
import { useEffect, useRef, useState } from "react";
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
