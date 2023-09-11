import Link from "next/link";
import { AuthenticationNav } from ".";

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
            className="flex-none md:hidden text-slate-200 font-extrabold text-2xl py-2 px-4 mr-4"
          >
            LNK
          </Link>

          <Link
            href="/"
            className="flex-none hidden md:block text-slate-200 font-extrabold text-2xl py-2 px-4 mr-4"
          >
            LNK Brewing
          </Link>
          <ul className="flex flex-grow items-center flex-row font-medium p-2 md:p-0  md:space-x-8">
            {children}
          </ul>
          <AuthenticationNav />
        </div>
      </div>
    </nav>
  );
};
