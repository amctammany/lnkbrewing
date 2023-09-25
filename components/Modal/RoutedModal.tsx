import clsx from "clsx";
import { Button, ButtonLink, ClickAwayRouter } from "..";

export type RoutedModalProps = {
  hidden?: boolean;
  returnUrl: string;
  children?: any;
};
export const RoutedModal = ({
  hidden,
  returnUrl,
  children,
}: RoutedModalProps) => {
  //const handleClose = () => router.back();
  const className = clsx(
    "bg-slate-800/75 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-0rem)] max-h-full pt-5",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );
  return (
    <div className={className}>
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <div className="relative p-5">
          <div>
            <ButtonLink scroll={false} href={returnUrl}>
              Close
            </ButtonLink>
          </div>
          <ClickAwayRouter url={returnUrl}>{children}</ClickAwayRouter>
        </div>
      </div>
    </div>
  );
};
