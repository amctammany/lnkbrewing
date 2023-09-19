import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { Menu, MenuItem } from "@/components";
import { AdminForm } from "./AdminForm";
//import { AdminModal } from "./AdminModal";
//import dynamic from "next/dynamic";
//const AdminForm = dynamic(
//() => import("./AdminForm").then((s) => s.AdminForm),
//{ ssr: false }
//);
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

export default async function AdminPage() {
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
      AdminPage
      <h4>{session?.user?.email}</h4>
      <div className="flex flex-auto">
        <Menu label="menu">
          <MenuItem>First</MenuItem>
          <MenuItem>Second</MenuItem>
        </Menu>
        <Menu label="menu">
          <MenuItem>First</MenuItem>
          <MenuItem>Second</MenuItem>
        </Menu>
      </div>
      <AdminForm src={user} />
    </div>
  );
}
