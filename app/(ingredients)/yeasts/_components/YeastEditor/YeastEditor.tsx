import React, { act } from "react";
import { YeastEditorForm, YeastEditorFormContainer } from "./YeastEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { YeastType } from "@/types/Ingredient";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";
import { UserPreferencesType } from "@/contexts/UserPreferencesContext";

export type YeastEditorProps<S = unknown> = {
  yeast: YeastType;
  preferences: UserPreferencesType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children?: React.ReactNode;
};
export default function YeastEditor({
  preferences,
  yeast,
  action,
}: YeastEditorProps) {
  return (
    <YeastEditorFormContainer
      preferences={preferences}
      src={yeast}
      action={action}
    >
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Yeasts", url: "/yeasts" },
          { title: yeast.name, url: `/yeasts/${yeast.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <div>
        <YeastEditorForm src={yeast} />
      </div>
    </YeastEditorFormContainer>
  );
}
