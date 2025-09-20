import React, { act } from "react";
import {
  FermentableEditorForm,
  FermentableEditorFormContainer,
} from "./FermentableEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { FermentableType } from "@/types/Ingredient";
import IconButton from "@/components/Button/IconButton";
import { Save } from "lucide-react";

export type FermentableEditorProps<S = unknown> = {
  fermentable: FermentableType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children?: React.ReactNode;
};
export default function FermentableEditor({
  fermentable,
  action,
}: FermentableEditorProps) {
  return (
    <FermentableEditorFormContainer src={fermentable} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Fermentables", url: "/fermentables" },
          { title: fermentable.name, url: `/fermentables/${fermentable.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <div>
        <FermentableEditorForm src={fermentable} />
      </div>
    </FermentableEditorFormContainer>
  );
}
