import type { Style } from "@/lib/generated/prisma/client";
import React from "react";
import StyleEditor from "./StyleEditor";
import { TopBar } from "@/components/TopBar/TopBar";
import { Button } from "@/components/ui/button";
export type StyleEditorPageProps = { style: Style };

export function StyleEditorPage({ style }: StyleEditorPageProps) {
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Styles", url: "/styles" },
          { title: style.name, isCurrent: true },
        ]}
      >
        <Button type="submit">Save</Button>
      </TopBar>
      <StyleEditor style={style} />
    </div>
  );
}
export default StyleEditorPage;
