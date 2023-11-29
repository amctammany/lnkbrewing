import { ButtonLink } from "@/components/Button/Button";
import { DialogButton } from "@/components/Dialog";
import Prop from "@/components/Prop/Prop";
import { Section } from "@/components/Section/Section";

export type AdminPageProps = {
  src: any;
  action?: any;
  //children: React.ReactNode;
};

const AdminSettingsActions = () => {
  return (
    <div className="grid grid-flow-col">
      <ButtonLink href="/admin/settings">Settings</ButtonLink>
      <ButtonLink href="/admin/preferences">Preferences</ButtonLink>
      <ButtonLink href="/api/auth/signout">Signout</ButtonLink>
      <DialogButton variant="success" title="dialogContext" message="foo">
        Dialog
      </DialogButton>
    </div>
  );
};

export const AdminPage = ({ src, action }: AdminPageProps) => {
  return (
    <div className="mx-auto w-10/12">
      <Section header="Admin" actions={<AdminSettingsActions />}>
        <div>
          <Prop label="Name" value={src.name} />
          <Prop label="Email" value={src.email} />
        </div>
        <div>
          <ButtonLink href="/api/auth/signout">Signout</ButtonLink>
        </div>
      </Section>
    </div>
  );
};
export default AdminPage;
