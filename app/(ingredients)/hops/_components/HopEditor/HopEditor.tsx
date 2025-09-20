import React, { act } from "react";
import { HopEditorForm, HopEditorFormContainer } from "./HopEditorForm";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { HopType } from "@/types/Ingredient";
import { Save } from "lucide-react";
import IconButton from "@/components/Button/IconButton";

export type HopEditorProps<S = unknown> = {
  src: HopType;
  action: (state: S, formData: FormData) => S | Promise<S>;
  children?: React.ReactNode;
};
export default function HopEditor({ src: hop, action }: HopEditorProps) {
  return (
    <HopEditorFormContainer src={hop} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Ingredients" },
          { title: "Hops", url: "/hops" },
          { title: hop.name, url: `/hops/${hop.slug}` },
        ]}
      >
        <IconButton icon={Save} type="submit">
          Save
        </IconButton>
      </TopBar>
      <div>
        <HopEditorForm src={hop} />
      </div>
    </HopEditorFormContainer>
  );
}
