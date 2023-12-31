import clsx from "clsx";
import { Button, ButtonLink, ClickAwayRouter } from "..";
import { XMarkIcon } from "@heroicons/react/24/solid";

export type RoutedModalProps = {
  hidden?: boolean;
  title?: string;
  returnUrl: string;
  children?: any;
};
export const RoutedModal = ({
  hidden,
  title,
  returnUrl,
  children,
}: RoutedModalProps) => {
  //const handleClose = () => router.back();
  const cn = clsx(
    "inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40",
    {
      hidden: hidden,
      fixed: !hidden,
      RoutedModal,
    }
  );
  return (
    <div className={cn}>
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white mt-3">
        <ClickAwayRouter url={returnUrl}>
          <div className="relative p-0 z-50">
            <div className="w-full bg-primary-500 flex ">
              <div className="flex-grow m-1 py-2 px-4 text-lg font-bold">
                {title}
              </div>
              <div className="flex-shrink-0">
                <ButtonLink scroll={false} href={returnUrl}>
                  <XMarkIcon className="h-6 w-6 text-black font-bold " />
                </ButtonLink>
              </div>
            </div>
            {children}
          </div>
        </ClickAwayRouter>
      </div>
    </div>
  ); /**  const className = clsx(
    "bg-slate-800/75 top-0 bottom-0 right-0 left-0 z-50  h-[calc(100%-1rem)] w-[calc(100%-0rem)] max-h-full pt-5",
    {
      hidden: hidden,
      fixed: !hidden,
    }
  );

  return (
    <div className={className}>
      <div className="relative mx-auto max-w-2xl border-slate-200 rounded bg-white ">
        <ClickAwayRouter url={returnUrl}>
          <div className="relative p-5">
            <div>
              <ButtonLink scroll={false} href={returnUrl}>
                Close
              </ButtonLink>
            </div>
            {children}
          </div>
        </ClickAwayRouter>
      </div>
    </div>
  );
    */
};
