import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/client";
//import { AdminForm } from "./AdminForm";
//import { AdminModal } from "./AdminModal";
import AdminPage from "./AdminPage";
import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components";
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

  const AdminSettingsActions = () => {
    return (
      <div>
        <ButtonLink href="/admin/settings">Edit</ButtonLink>
      </div>
    );
  };
  return (
    <div className="mx-auto w-10/12">
      <Section header="Admin" actions={<AdminSettingsActions />}>
        <AdminPage src={user} />
      </Section>
    </div>
  );
}
