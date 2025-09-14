import type { Style } from "@/lib/generated/prisma/client";
import React from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { StyleDisplay } from "./StyleDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export type StyleDisplayPageProps = {
  style: Style;
};
export function StyleDisplayPage({ style }: StyleDisplayPageProps) {
  return (
    <div>
      <TopBar
        breadcrumbs={[
          { title: "Styles", url: "/styles" },
          { title: style.name, isCurrent: true },
        ]}
      >
        <Button asChild>
          <Link href={`/styles/${style.slug}/edit`}>Edit</Link>
        </Button>
      </TopBar>

      <StyleDisplay style={style} />
    </div>
  );
}
