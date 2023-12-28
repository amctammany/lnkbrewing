import { Icon } from "../Icon";
import { Button, ButtonProps } from "./Button";

export type IconButtonProps = ButtonProps & {
  Icon: typeof Icon;
};
export const IconButton = ({ Icon, children, ...props }: IconButtonProps) => {
  const body = (
    <div className="flex px-1 text-sm -mx-2">
      <Icon />
      <span className="block m-auto pl-1 uppercase">{children}</span>
    </div>
  );
  return <Button {...props}>{body}</Button>;
};
