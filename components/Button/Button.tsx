export type ButtonProps = {
  onClick?: React.MouseEventHandler;
  className?: string;
  children?: React.ReactNode;
};
export const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      className={`block text-center font-bold border px-2 py-1 m-2 bg-blue-400 text-white hover:text-red-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
