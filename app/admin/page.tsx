import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { Menu, MenuItem } from "@/components";
//import { AdminForm } from "./AdminForm";
//import { AdminModal } from "./AdminModal";
import AdminPage from "./AdminPage";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email },
    include: {
      recipes: { select: { name: true, id: true, styleIdentifer: true } },
    },
  });

  return (
    <div className="p-3 max-w-2xl">
      <AdminPage src={user} />
    </div>
  );
}
