import { auth } from "@/app/auth";
import Link from "next/link";
import { NavLink } from "./NavLink";
export type AuthenticationNavProps = {
  //children: React.ReactNode;
};

export const AuthenticationNav = async ({}: AuthenticationNavProps) => {
  const session = await auth();
  //console.log(session);
  return session === null ? (
    <Link
      href={"/api/auth/signin"}
      className="block text-center py-2 px-4 rounded-lg font-bold text-white hover:text-red-500"
    >
      Sign In
    </Link>
  ) : (
    <NavLink
      href="/admin"
      className="block text-center py-2 px-4 rounded-lg font-bold text-white hover:text-red-500"
    >
      Admin
    </NavLink>
  );
};
