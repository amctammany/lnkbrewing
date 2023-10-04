import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type FormProps<T extends FieldValues = {}> = {
  children?: React.ReactNode;
  action?: (data: FormData) => void;
  onSubmit?: any;
};
export const Form = ({ children, action, onSubmit }: FormProps) => {
  return (
    <div className="relative flex-auto w-full m-2 p-2 bg-white">
      <form action={action} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
