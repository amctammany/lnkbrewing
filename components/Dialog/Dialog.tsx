"use client";

import clsx from "clsx";
import { useDialog } from "./useDialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button";
import { useClickAway } from "@/hooks/useClickAway";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const dialogStyles = cva(
  ["inset-0 bg-opacity-50 overflow-y-auto h-full w-full"],
  {
    variants: {
      variant: {
        default: ["bg-gray-400"],
        warning: ["bg-red-700"],
      },
      open: {
        open: ["fixed"],
        closed: ["hidden"],
      },
    },
    defaultVariants: {
      variant: "default",
      open: "closed",
    },
  }
);
const dialogHeaderStyles = cva(["w-full flex flex-row-reverse rounded-t-md"], {
  variants: {
    variant: {
      default: ["bg-slate-400 "],
      warning: ["bg-red-800 "],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const dialogFooterStyles = cva(["mx-auto text-center rounded-b-lg"], {
  variants: {
    variant: {
      default: ["bg-slate-200 "],
      warning: ["bg-red-200 "],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type DialogProps = VariantProps<typeof dialogStyles> &
  ComponentProps<"div">;
export const Dialog = ({ className, variant }: DialogProps) => {
  const { content, closeDialog } = useDialog();
  const onConfirm = () => {
    if (content?.action) content.action();
    if (closeDialog) closeDialog();
  };
  const ref = useClickAway(() => {
    if (closeDialog) closeDialog();
  });
  const styleProps: VariantProps<typeof dialogStyles> = {
    variant,
    open: content?.open ? "open" : "closed",
  };
  return (
    <div className={twMerge(dialogStyles(styleProps), className)}>
      <div
        ref={ref}
        className="relative mx-auto max-w-2xl border-slate-200 rounded-lg bg-white mt-12"
      >
        <div className="relative p-0 rounded-lg border-2 border-black">
          <div className={dialogHeaderStyles(styleProps)}>
            <Button onClick={closeDialog}>
              <XMarkIcon className="h-6 w-6 text-black font-bold " />
            </Button>
            <div className="flex-grow m-1 py-2 px-4 text-lg font-bold">
              {content?.title}
            </div>
          </div>

          <div className="p-4 text-lg">{content?.message}</div>
          <div className={dialogFooterStyles(styleProps)}>
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
