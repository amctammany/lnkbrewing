import { Button, ButtonLink } from "..";

export type ModalProps = {
  hidden?: boolean;
  returnUrl: string;
  children?: any;
};

<<<<<<< HEAD
export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed  top-2 bottom-2 right-2 left-2 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full">
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">{children}</div>
=======
export const Modal = ({ hidden, returnUrl, children }: ModalProps) => {
  //const handleClose = () => router.back();
  return (
    <div
      className={` ${
        hidden ? "hidden" : "fixed"
      } top-2 bottom-2 right-2 left-2 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">
          <div>
            <ButtonLink scroll={false} href={returnUrl}>
              Close
            </ButtonLink>
          </div>
          {children}
        </div>
>>>>>>> recipeingredients
      </div>
    </div>
  );
};
