export type ModalProps = {
  name?: string;
  children?: any;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed  top-2 bottom-2 right-2 left-2 z-50  h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-h-full">
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">{children}</div>
      </div>
    </div>
  );
};
