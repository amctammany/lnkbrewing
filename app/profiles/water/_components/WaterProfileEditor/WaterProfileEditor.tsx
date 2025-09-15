import { WaterProfile } from "@prisma/client";
import React from "react";
import {
  WaterProfileForm,
  WaterProfileFormContainer,
} from "./WaterProfileForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";

export type WaterProfileEditorProps = {
  profile: WaterProfile;
  action: any;
};
export default function WaterProfileEditor({
  profile,
  action,
}: WaterProfileEditorProps) {
  return (
    <WaterProfileFormContainer profile={profile} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Profiles", url: "/profiles" },
          { title: "Water", url: "/profiles/water" },
          { title: profile.name, url: `/profiles/water/${profile.slug}` },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <WaterProfileForm />
    </WaterProfileFormContainer>
  );
}
