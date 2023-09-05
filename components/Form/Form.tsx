export type FormProps = {
  children?: React.ReactNode;
  action?: (data: FormData) => void;
};
export const Form = ({ children, action }: FormProps) => {
  return (
    <div className="flex-auto w-full m-2 p-2 bg-white">
      <form action={action}>
        <div className="">{children}</div>
      </form>
    </div>
  );
};
