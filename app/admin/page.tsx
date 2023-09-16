import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
import { Menu, MenuItem } from "@/components";
import { AdminForm } from "./AdminForm";
import { AdminModal } from "./AdminModal";

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
    <div>
      AdminPage
      <h4>{session?.user?.email}</h4>
      <p>{JSON.stringify(user)}</p>
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
      <AdminModal>
        <AdminForm src={user} />
      </AdminModal>
    </div>
  );
}
