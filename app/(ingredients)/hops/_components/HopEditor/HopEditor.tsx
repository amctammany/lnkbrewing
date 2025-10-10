import React, { act } from "react";
import { HopEditorForm, HopEditorFormContainer } from "./HopEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { HopType } from "@/types/Ingredient";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import HopEditorTools from "./HopEditorTools";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";

export type HopEditorProps<S = unknown> = {
  src: HopType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  preferences: UserPreferencesType;
  children?: React.ReactNode;
};
export default function HopEditor({
  src: hop,
  preferences,
  action,
}: HopEditorProps) {
  return (
    <HopEditorFormContainer src={hop} action={action} preferences={preferences}>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
          { title: hop.name, url: `/hops/${hop.slug}` },
        ]}
      >
        <HopEditorTools />
      </TopBar>
      <div>
        <HopEditorForm src={hop} />
      </div>
    </HopEditorFormContainer>
  );
}
