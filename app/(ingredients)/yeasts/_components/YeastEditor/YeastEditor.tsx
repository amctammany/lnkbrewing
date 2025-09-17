import React, { act } from "react";
import { YeastEditorForm, YeastEditorFormContainer } from "./YeastEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { YeastType } from "@/types/Ingredient";

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
        <Button type="submit">Save</Button>
      </TopBar>
      <div>
        <YeastEditorForm src={yeast} />
      </div>
    </YeastEditorFormContainer>
  );
}
