import type { Style } from "@/lib/generated/prisma/client";
import React from "react";
export type StyleEditorProps = { style: Style };

export default function StyleEditor({ style }: StyleEditorProps) {
  return <div>Style Editor for {style.name}</div>;
}
