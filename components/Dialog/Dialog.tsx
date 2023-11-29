"use client";

import clsx from "clsx";
import { useDialog } from "./useDialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button";
import { useClickAway } from "@/hooks/useClickAway";

export const Dialog = () => {
  const { content, closeDialog } = useDialog();
  const cn = clsx(
    "inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",
    {
      hidden: !content?.open,
      fixed: content?.open,
    }
  );
  const onConfirm = () => {
    if (content?.action) content.action();
    if (closeDialog) closeDialog();
  };
  const ref = useClickAway(() => {
    if (closeDialog) closeDialog();
  });
  return (
    <div className={cn}>
      <div
        ref={ref}
        className="relative mx-auto max-w-2xl border-slate-200 rounded-lg bg-white mt-12"
      >
        <div className="relative p-0 rounded-lg border-2 border-black">
          <div className="w-full bg-red-400 flex flex-row-reverse rounded-t-md">
            <Button onClick={closeDialog}>
              <XMarkIcon className="h-6 w-6 text-black font-bold " />
            </Button>
            <div className="flex-grow m-1 py-2 px-4 text-lg font-bold">
              {content?.title}
            </div>
          </div>

          <div className="p-4">Message: {content?.message}</div>
          <div className="mx-auto text-center bg-slate-200  rounded-b-lg">
            <div className="m-0 p-0 inline-flex flex-row justify-items-center">
              <Button variant="dark" onClick={onConfirm}>
                Confirm
              </Button>
              <Button variant="gradient" onClick={closeDialog}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
