import Button from "@/components/Button/Button";
import { TopBar } from "@/components/TopBar/TopBar";
import { User } from "@prisma/client";
import React from "react";
import { SettingsContainerForm, SettingsForm } from "./SettingsForm";

export type SettingsProps = {
  action: (formData: FormData) => Promise<void>;
  user: User;
};
export function Settings({ user, action }: SettingsProps) {
  return (
    <SettingsContainerForm user={user} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Dashboard", url: "/admin" },
          { title: "Settings", url: "/admin/settings" },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <SettingsForm user={user} action={action} />
    </SettingsContainerForm>
  );
}

export default Settings;
