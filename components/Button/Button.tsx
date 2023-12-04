import Link from "next/link";

export type ButtonProps = {
  onClick?: React.MouseEventHandler;
  className?: string;
  children?: React.ReactNode;
};
//export const Button = ({ onClick, className, children }: ButtonProps) => {
//return (
//<button
//className={`block text-center font-bold border px-2 py-1 m-2 bg-blue-400 text-white hover:text-red-500 ${className}`}
//onClick={onClick}
//>
//{children}
//</button>
//);
//};
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  ["flex items-center  text-bold justify-center border-2 border-black"],
  {
    variants: {
      variant: {
        default: [
          "bg-default-500",
          //"bg-default-button",
          "hover:bg-default-200",
          "text-contrast-default",
          "hover:text-default-900",
        ],
        primary: [
          "bg-primary-500",
          //"bg-primary-button",
          "hover:bg-primary-200",
          "text-contrast-primary",
          "hover:text-primary-900",
        ],
        success: ["bg-success-500", "hover:bg-success-100"],
        warning: [
          "bg-warning-700",
          "hover:bg-warning-200",
          "text-black",
          "hover:text-warning-800",
        ],
        dark: ["bg-green-900", "hover:bg-slate-800", "text-white"],
      },
      size: {
        default: ["rounded", "m-2", "px-2", "py-1"],
        button: ["rounded", "h-10", "w-32"],
        icon: ["rounded-full", "w-20", "h-20", "p-2.5"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonType = VariantProps<typeof buttonStyles> &
  ComponentProps<"button">;

export const Button = ({ variant, size, className, ...props }: ButtonType) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

export default Button;
export type ButtonLinkProps = ButtonType & { scroll?: boolean; href: string };
export const ButtonLink = ({ href, scroll, ...props }: ButtonLinkProps) => {
  return (
    <Link href={href} scroll={scroll}>
      <Button {...props} />
    </Link>
  );
};
