import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
export type AuthenticationNavProps = {
  //children: React.ReactNode;
};

export const AuthenticationNav = async ({}: AuthenticationNavProps) => {
  //const session = await getServerSession(authOptions);
  const session = null;
  //console.log(session);
  return session === null ? (
    <Link
      href={"/api/auth/signin"}
      className="block text-center py-2 px-4 rounded-lg font-bold text-white hover:text-red-500"
    >
      Sign In
    </Link>
  ) : (
    <Link
      href="/admin"
      className="block text-center py-2 px-4 rounded-lg font-bold text-white hover:text-red-500"
    >
      Admin
    </Link>
  );
};
