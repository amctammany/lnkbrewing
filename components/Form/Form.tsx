import { VariantProps, cva } from "class-variance-authority";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export type FormProps<T extends FieldValues = {}> = {
  children?: React.ReactNode;
  action?: (data: FormData) => void;
  onSubmit?: any;
} & VariantProps<typeof formStyles>;
const formStyles = cva(["flex-autao"], {
  variants: {
    variant: {
      default: ["bg-white"],
    },
    size: {
      default: ["w-full", "m-0", "p-2"],
    },
  },
  defaultVariants: { size: "default", variant: "default" },
});

export const Form = ({
  children,
  action,
  onSubmit,
  variant,
  size,
}: FormProps) => {
  return (
    <div className={formStyles({ size, variant })}>
      <form action={action} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};
