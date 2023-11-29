"use client";

import { useDialog } from "./useDialog";

export const Dialog = () => {
  const { content, closeDialog } = useDialog();
  return (
    <div className={content?.open ? "" : "hidden"}>
      <div>TItle: {content?.title}</div>
      <div>Message: {content?.message}</div>
      <button onClick={closeDialog}>X</button>
      <button onClick={content?.action}>Do it</button>
    </div>
  );
};
