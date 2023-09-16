//"use client";
import clsx from "clsx";
import { Button, ButtonLink } from "..";

export type NewModalProps = {
  hidden?: boolean;
  menu?: React.ReactNode;
  //returnUrl: string;
  //onClose?: any;
  children?: any;
};
export const NewModal = ({ hidden, menu, children }: NewModalProps) => {
  //const handleClose = () => router.back();
  const className = clsx(
    " top-2 bottom-2 right-2 left-2 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );
  return (
    <div className={className}>
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">
          <div>{menu}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default NewModal;
