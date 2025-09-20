import { MashProfile } from "@prisma/client";
import React from "react";
import { MashProfileForm, MashProfileFormContainer } from "./MashProfileForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { OptionalNullable } from "@/lib/utils";
import { BaseMashProfile, MashProfileType } from "@/types/Profile";
import Link from "next/link";

export type MashProfileEditorProps = {
  profile: MashProfileType;
  action: any;
};
export default function MashProfileEditor({
  profile,
  action,
}: MashProfileEditorProps) {
  return (
    <MashProfileFormContainer profile={profile} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Profiles" },
          { title: "Mash", url: "/mash" },
          { title: profile.name, url: `/mash/${profile.slug}` },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <h3 className={profile.origin ? "" : "hidden"}>
        Forked From:
        <Link href={`/mash/${profile.origin?.slug}`}>
          {profile.origin?.name}
        </Link>
      </h3>
      <MashProfileForm profile={profile} />
    </MashProfileFormContainer>
  );
}
