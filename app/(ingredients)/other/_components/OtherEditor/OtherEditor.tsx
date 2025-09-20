import React, { act } from "react";
import { OtherEditorForm, OtherEditorFormContainer } from "./OtherEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { OtherType } from "@/types/Ingredient";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

export type OtherEditorProps<S = unknown> = {
  src: OtherType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children?: React.ReactNode;
};
export default function OtherEditor({ src: other, action }: OtherEditorProps) {
  return (
    <OtherEditorFormContainer src={other} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Other", url: "/other" },
          { title: other.name, url: `/other/${other.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <div>
        <OtherEditorForm src={other} />
      </div>
    </OtherEditorFormContainer>
  );
}
