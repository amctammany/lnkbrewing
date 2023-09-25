//"use client";
import clsx from "clsx";
import { Button, ButtonLink } from "..";

export type ModalProps = {
  hidden?: boolean;
  menu?: React.ReactNode;
  //returnUrl: string;
  //onClose?: any;
  children?: any;
};
export const Modal = ({ hidden, menu, children }: ModalProps) => {
  //const handleClose = () => router.back();
  const className = clsx(
    "bg-slate-400/50 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );
  return (
    <div className={className}>
      <div className=" relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">
          <div>{menu}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
