import type { Style } from "@/lib/generated/prisma/client";
import React from "react";
import StyleEditor from "./StyleEditor";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
import { Form, useForm } from "react-hook-form";
import StyleEditorContainer from "./StyleEditorContainer";
export type StyleEditorPageProps = {
  action: (data: FormData) => Promise<void>;
  style: Style;
};

export function StyleEditorPage({ action, style }: StyleEditorPageProps) {
  return (
    <StyleEditorContainer style={style} action={action}>
      <TopBar
        breadcrumbs={[
          { title: "Styles", url: "/styles" },
          { title: style.name, isCurrent: true },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <StyleEditor style={style} />
    </StyleEditorContainer>
  );
}
export default StyleEditorPage;
