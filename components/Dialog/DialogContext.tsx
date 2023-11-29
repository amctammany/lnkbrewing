"use client";
import { Dispatch, createContext, useState } from "react";

export const DialogContext = createContext<{
  content?: DialogContent;
  closeDialog?: () => void;
  openDialog?: (data: Omit<DialogContent, "open">) => void;
}>({});

type DialogContent = {
  open: boolean;
  title?: string;
  message?: string;
  action?: any;
};

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [action, setAction] = useState<string>();
  const [content, setContent] = useState<DialogContent>({ open: false });
  const openDialog = (data: Omit<DialogContent, "open">) => {
    setContent({ ...data, open: true });
  };
  const closeDialog = () => {
    setContent({ open: false });
  };
  return (
    <DialogContext.Provider value={{ content, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
