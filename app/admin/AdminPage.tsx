import { ButtonLink } from "@/components/Button/Button";
import Prop from "@/components/Prop/Prop";
import { Section } from "@/components/Section/Section";

export type AdminPageProps = {
  src: any;
  action?: any;
  //children: React.ReactNode;
};
export const AdminPage = ({ src, action }: AdminPageProps) => {
  return (
    <div>
      <div>
        <Prop label="Name" value={src.name} />
        <Prop label="Email" value={src.email} />
      </div>
      <div>
        <ButtonLink href="/api/auth/signout">Signout</ButtonLink>
      </div>
    </div>
  );
};
export default AdminPage;
