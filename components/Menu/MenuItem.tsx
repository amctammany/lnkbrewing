export type MenuItemProps = {
  children: React.ReactNode;
};

export const MenuItem = ({ children }: MenuItemProps) => {
  return (
    //<li>
    <a
      //className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
      className="block px-4 py-2 text-sm capitalize text-gray-800 hover:bg-indigo-500 hover:text-white"
      href="#"
      //onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
    //</li>
  );
};
