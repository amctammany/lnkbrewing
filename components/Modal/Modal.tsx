//"use client";
import clsx from "clsx";
import { Button, ButtonLink } from "../Button";
import { useClickAway } from "@/hooks/useClickAway";

export type ModalProps = {
  hidden?: boolean;
  menu?: React.ReactNode;
  //returnUrl: string;
  close: () => void;
  children?: any;
};
export const Modal = ({ hidden, close, menu, children }: ModalProps) => {
  //const handleClose = () => router.back();
  const className = clsx(
    "bg-slate-400/50 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );
  const ref = useClickAway(() => {
    close();
  });

  return (
    <div className={className}>
      <div className=" relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div ref={ref} className="relative p-5">
          <div>
            <Button onClick={close}>Close</Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
