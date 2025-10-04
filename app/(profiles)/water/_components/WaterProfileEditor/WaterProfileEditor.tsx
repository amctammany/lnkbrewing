import React from "react";
import {
  WaterProfileForm,
  WaterProfileFormContainer,
} from "./WaterProfileForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { WaterProfileType } from "@/types/Profile";
import Link from "next/link";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

export type WaterProfileEditorProps = {
  profile: WaterProfileType;
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
          { title: "Profiles" },
          { title: "Water", url: "/water" },
          { title: profile.name, url: `/water/${profile.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <h3 className={profile.origin ? "" : "hidden"}>
        Forked From:
        <Link href={`/water/${profile.origin?.slug}`}>
          {profile.origin?.name}
        </Link>
      </h3>
      <WaterProfileForm />
    </WaterProfileFormContainer>
  );
}
