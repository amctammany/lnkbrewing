"use client";
import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export const useDialog = () => {
  const dialogContext = useContext(DialogContext);
  if (dialogContext === undefined)
    throw new Error("Must be used within Provider");
  return dialogContext;
};
