export type ModalProps = {
  name?: string;
  children?: any;
};

export const Modal = ({ children }: ModalProps) => {
  console.log("modal");
  return (
    <div className="fixed top-2 bottom-2 left-2 right-2 p-2 m-4 bg-white z-50 w-full">
      {children}
    </div>
  );
};
