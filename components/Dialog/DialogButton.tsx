"use client";
import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export type DialogButtonProps = {
  title?: string;
  message?: string;
  action?: string;
  children?: React.ReactNode;
};
export const DialogButton = ({
  title,
  message,
  action,
  children,
}: DialogButtonProps) => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("DialogButton must be used within DialogContext");
  const onClick = () => {
    if (ctx.openDialog) ctx.openDialog({ title, message, action });
  };

  return <button onClick={onClick}>{children}</button>;
};
