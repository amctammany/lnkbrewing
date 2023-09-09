import Link from "next/link";

export type NavProps = {
  children: React.ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return (
    <nav className="bg-slate-600 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div className="flex flex-row items-center flex-grow ">
          <Link
            href="/"
            className="flex-none text-slate-200 font-extrabold text-2xl py-2 px-4 mr-4"
          >
            LNK Brewing
          </Link>
          <ul className="flex items-center flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};
