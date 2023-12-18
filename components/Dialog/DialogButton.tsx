"use client";
import { useContext } from "react";
import { DialogContext } from "./DialogContext";
import { Button, ButtonProps } from "../Button";

export type DialogButtonProps = ButtonProps & {
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
  ...props
}: DialogButtonProps) => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("DialogButton must be used within DialogContext");
  const onClick = () => {
    if (ctx.openDialog) ctx.openDialog({ title, message, action });
  };

  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};
