import React, { act } from "react";
import { YeastEditorForm, YeastEditorFormContainer } from "./YeastEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { YeastType } from "@/types/Ingredient";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

export type YeastEditorProps<S = unknown> = {
  yeast: YeastType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children?: React.ReactNode;
};
export default function YeastEditor({ yeast, action }: YeastEditorProps) {
  return (
    <YeastEditorFormContainer src={yeast} action={action}>
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
