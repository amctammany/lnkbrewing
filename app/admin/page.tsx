import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import AdminPage from "./AdminPage";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export default async function Page() {
  //const session = await getServerSession(authOptions);

  const sessionUser = { email: "em", name: "name" };
  //if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: sessionUser?.email },
    include: {
      recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });
  return <AdminPage src={user} />;
}
