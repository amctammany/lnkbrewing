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
  ["flex", "items-center", "justify-center", "transition-colors"],
  {
    variants: {
      variant: {
        default: [
          "bg-gray-400",
          "hover:bg-gray-100",
          "border-2",
          "border-black",
        ],
        hover: ["hover:bg-green-200"],
        dark: ["bg-green-900", "hover:bg-slate-800", "text-white"],
        gradient: [
          "bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
        ],
        hoverBorder: ["hover:border-4", "rounded-full", "p-2", "border-black"],
        border: [
          "border-4",
          "rounded-full",
          "p-2",
          "border-black",
          "hover:bg-gradient-to-br",
          "hover:from-indigo-500",
          "hover:via-purple-500",
          "hover:to-pink-500",
        ],
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
export type ButtonLinkProps = ButtonProps & { scroll?: boolean; href: string };
export const ButtonLink = ({ href, scroll, ...props }: ButtonLinkProps) => {
  return (
    <Link href={href} scroll={scroll}>
      <Button {...props} />
    </Link>
  );
};
