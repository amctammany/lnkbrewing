export type NavProps = {
  children: React.ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div className="flex flex-row items-center flex-grow ">
          <div className="flex-none font-extrabold text-2xl py-2 px-4 mr-4">
            LNK Brewing
          </div>
          <ul className="flex items-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};
